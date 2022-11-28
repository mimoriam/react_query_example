import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchPosts() {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0`
    );
    return response.json();
}

export const Posts = () => {

    const queryClient = useQueryClient();
    const { data, isError, error, isLoading } = useQuery(
        ["posts"],
        () => fetchPosts(),
        // This is time in milliseconds so 2k = 2 secs
        { staleTime: 2000 }
    );

    if (isLoading) return <div>Loading...</div>
    if (isError) return <p>{error.toString()}</p>;

    return (
        <>
            <ul>{data.map(post => (
                <li key={post.id}>
                    {post.title}
                </li>
            ))}</ul>
        </>
    )
};