import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient();

const App = () => {
    return (
        // Provide client to the App:
        <QueryClientProvider client={queryClient}>
            <>
            </>
        </QueryClientProvider>
    )
};

export default App;
