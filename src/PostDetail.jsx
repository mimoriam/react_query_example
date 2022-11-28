import { useQuery, useMutation } from '@tanstack/react-query';

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


export const PostDetail = ({ post }) => {

    const { data, isLoading, isError, error } = useQuery(
        ["comments", post.id],
        () => fetchComments(post.id)
    );

    const deleteMutation = useMutation(() => deletePost(post.id));

    if (isLoading) return <div>Loading...</div>
    if (isError) return <p>{error.toString()}</p>;

    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>

            <button onClick={() => deleteMutation.mutate()}>Delete</button>
            <button>Update</button>

            {deleteMutation.isError && (
                <p style={{ color: "red" }}>Error deleting the post</p>
            )}
            {deleteMutation.isLoading && (
                <p style={{ color: "purple" }}>Deleting the post</p>
            )}
            {deleteMutation.isSuccess && (
                <p style={{ color: "green" }}>Post has (not) been deleted</p>
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