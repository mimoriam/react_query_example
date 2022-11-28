import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export const InfinitePeople = () => {

    const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery(
        ["sw-people"],
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        // The API has a "next" property, so we tell RQ to use that for next page:
        { getNextPageParam: (lastPage) => lastPage.next || undefined }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error! {error.toString()}</div>;

    return (
        <>
            {/*This is crucial to useInfiniteQuery else data jumps back to start*/}
            {isFetching && <div>Loading...</div>}

            <InfiniteScroll
                // add initialLoad={false} to prevent loading two pages on component mount:
                initialLoad={false}
                loadMore={fetchNextPage}
                hasMore={hasNextPage}>
                {data.pages.map(pageData => {
                    return pageData.results.map(person => {
                        return (
                            <li>
                                {person.name}
                                <ul>
                                    <li>hair: {person.hair_color}</li>
                                    <li>eyes: {person.eye_color}</li>
                                </ul>
                            </li>
                        )
                    })
                })}
            </InfiniteScroll>
        </>
    );
}