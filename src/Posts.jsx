import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchPosts() {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0`
    );
    return response.json();
}

export const Posts = () => {

    const queryClient = useQueryClient();
    const { data } = useQuery(["posts"], fetchPosts);

    if (!data) return <div></div>

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