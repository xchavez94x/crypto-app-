import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseNewsUrl = 'https://bing-news-search1.p.rapidapi.com';
const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '7b2afa1917mshcddb9d3eaabe66fp14797bjsn7a7b86f288a5'
};

const createQuery = url => ({
    url,
    headers: cryptoNewsHeaders
});

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseNewsUrl
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createQuery(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi;