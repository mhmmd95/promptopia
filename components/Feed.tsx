"use client";

import { ChangeEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: any) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post: any) => {
				return (
					<PromptCard
						key={post.creator}
						post={post}
						handleTagClick={handleTagClick}
					/>
				);
			})}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState<any>(null);
	const [posts, setPosts] = useState([]);
	const [searchedPosts, setSearchedPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch("/api/prompt");
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchtext: string) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return posts.filter(
			(item: any) =>
				regex.test(item.creator.username) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		);
	};

  const handleTagClicked = (tag: string) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchedPosts(searchResult);
  }

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResults = filterPrompts(searchText);
				setSearchedPosts(searchResults);
			}, 500)
		);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<PromptCardList data={searchedPosts} handleTagClick={handleTagClicked} />
			) : (
				<PromptCardList data={posts} handleTagClick={handleTagClicked} />
			)}
		</section>
	);
};

export default Feed;
