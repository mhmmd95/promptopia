"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const ProfilePage = () => {
    const {data: session} = useSession();//get the data from the session and rename it to session
    const router = useRouter();
    const [posts, setPosts] = useState([]);
	const handleDelete = async (post: any) => {};
	const handleEdit = (post: any) => {
        router.push(`/update-prompt?id=${post._id}`)
    };

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
    
        if(session?.user) {fetchPosts();}
      }, []);

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;
