import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Posts } from './BlogPosts/Posts';

import { Routes, Route } from "react-router-dom";

// Create a client
const queryClient = new QueryClient();

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<BlogPosts/>}/>
            {/*<Route path="/swapi" element={< />} />*/}
        </Routes>
    )
};

function BlogPosts() {
    return (
        // Provide client to the App:
        <QueryClientProvider client={queryClient}>
            <>
                <h1>Blogs</h1>
                <Posts/>
            </>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}

export default App;
