import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";

import { PostDetail } from "./PostDetail";

const maxPostPage = 10;

async function fetchPosts(pageNum) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    );
    return response.json();
}

export const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    const queryClient = useQueryClient();

    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(["posts", nextPage], () =>
                fetchPosts(nextPage)
            );
        }
    }, [currentPage, queryClient]);

    // This is a query that supports pagination:
    const { data, isError, error, isLoading } = useQuery(
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        // This is time in milliseconds so 2k = 2 secs
        {
            staleTime: 2000,
            keepPreviousData: true,
        }
    );

    if (isLoading) return <div>Loading...</div>
    if (isError) return <p>{error.toString()}</p>;

    return (
        <>
            <ul>{data.map(post => (
                <li key={post.id}
                    onClick={() => setSelectedPost(post)}>
                    {post.title}
                </li>
            ))}</ul>

            <button
                disabled={currentPage <= 1}
                onClick={() => {
                    setCurrentPage((previousValue) => previousValue - 1)
                }}>Previous Page
            </button>

            <span>{currentPage}</span>

            <button
                disabled={currentPage >= maxPostPage}
                onClick={() => {
                    setCurrentPage((previousValue) => previousValue + 1)
                }}>Next Page
            </button>

            <br/>

            {/* Only show PostDetail if we click on one of the posts:*/}
            {selectedPost && <PostDetail post={selectedPost}/>}
        </>
    )
};