import { useQuery } from '@tanstack/react-query';

async function fetchComments(postId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
}


export const PostDetail = ({ post }) => {

    const { data, isLoading, isError, error } = useQuery(
        ["comments", post.id],
        () => fetchComments(post.id)
    );

    if (isLoading) return <div>Loading...</div>
    if (isError) return <p>{error.toString()}</p>;

    return (
        <>
            <p>{post.body}</p>
            {data.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    )
}