"use client";

import Form from "@components/Form";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { DefaultSession } from "next-auth";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				//TODO: continue from here..
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
