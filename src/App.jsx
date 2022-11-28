import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Posts } from './Posts';

// Create a client
const queryClient = new QueryClient();

const App = () => {
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
};

export default App;
