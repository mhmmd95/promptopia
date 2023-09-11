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

	const updatePrompt = async (e: FormEvent<SubmitEvent>) => {
		e.preventDefault();
		setSubmitting(true);
	
		if (!promptId) return alert("Missing PromptId!");
	
		try {
		  const response = await fetch(`/api/prompt/${promptId}`, {
			method: "PATCH",
			body: JSON.stringify({
			  prompt: post.prompt,
			  tag: post.tag,
			}),
		  });
	
		  if (response.ok) {
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
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
