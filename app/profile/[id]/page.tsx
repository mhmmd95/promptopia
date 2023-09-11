"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const GuestProfile = ({ params }: any) => {
	const [posts, setPosts] = useState([]);
	const userName = useSearchParams().get("name");

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};

		params?.id && fetchPosts();
	}, [params.id]);

	return (
		userName && (
			<Profile
				name={userName}
				desc={`Welcome to ${userName} profile page`}
				data={posts}
			/>
		)
	);
};

export default GuestProfile;
