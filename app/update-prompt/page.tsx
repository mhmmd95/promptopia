"use client";

import Form from "@components/Form";
import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
	const router = useRouter();
    const promptId = useSearchParams().get('id');
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

    useEffect(() => {

        const getPrompt = async() => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost(data)
        }

        promptId && getPrompt();

    }, [promptId]);

	// const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	setSubmitting(true);

	// 	try {
	// 		const response = await fetch("/api/prompt/new", {
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				prompt: post.prompt,
	// 				userId: session?.user.id,
	// 				tag: post.tag,
	// 			}),
	// 		});

	// 		if (response.ok) {
	// 			//TODO: continue from here..
	// 			router.push("/");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		setSubmitting(false);
	// 	}
	// };

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={() => {}}
		/>
	);
};

export default EditPrompt;
