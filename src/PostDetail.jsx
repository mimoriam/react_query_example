import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect } from "react";

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}

async function deletePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "DELETE" }
    );
    return response.json();
}

async function updatePost(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/postId/${postId}`,
        { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
    );
    return response.json();
}


export const PostDetail = ({ post }) => {

    const { data, isLoading, isError, error } = useQuery(
        ["comments", post.id],
        () => fetchComments(post.id)
    );

    const deleteMutation = useMutation(() => deletePost(post.id));
    const updateMutation = useMutation(() => updatePost(post.id));

    // clear messages when a new post is selected
    useEffect(() => {
        updateMutation.reset();
        deleteMutation.reset();
        // can't include updateMutation and deleteMutation in the dependencies
        // because the function updates them -- so there would be an infinite loop!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post.id])

    if (isLoading) return <div>Loading...</div>
    if (isError) return <p>{error.toString()}</p>;

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>

            <button
                onClick={() => deleteMutation.mutate()}>Delete
            </button>

            <button
                onClick={() => updateMutation.mutate()}>Update
            </button>

            {deleteMutation.isError && (
                <p style={{ color: "red" }}>Error deleting the post</p>
            )}
            {deleteMutation.isLoading && (
                <p style={{ color: "purple" }}>Deleting the post</p>
            )}
            {deleteMutation.isSuccess && (
                <p style={{ color: "green" }}>Post has (not) been deleted</p>
            )}

            {updateMutation.isError && (
                <p style={{ color: "red" }}>Error updating the post</p>
            )}
            {updateMutation.isLoading && (
                <p style={{ color: "purple" }}>Updating the post</p>
            )}
            {updateMutation.isSuccess && (
                <p style={{ color: "green" }}>Post has (not) been updated</p>
            )}

            <p>{post.body}</p>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    )
}