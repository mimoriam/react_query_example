import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Posts } from './BlogPosts/Posts';

import { Routes, Route } from "react-router-dom";
import { InfinitePeople } from "./Swapi/infinitePeople";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 600000, // 10 minutes
            cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
        }
    }
});

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<BlogPosts/>}/>
            <Route path="/swapi" element={<InfiniteSwapi/>}/>
        </Routes>
    )
};

function BlogPosts() {
    return (
        // Provide client to the App:
        <QueryClientProvider client={queryClient}>
            <>
                <h1>Blogs:</h1>
                <Posts/>
            </>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}

function InfiniteSwapi() {
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <h1>Infinite SWAPI:</h1>
                <InfinitePeople/>
            </>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}

export default App;
