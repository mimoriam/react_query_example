import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export const InfinitePeople = () => {
    return <InfiniteScroll/>;
}