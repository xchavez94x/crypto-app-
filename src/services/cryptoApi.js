import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const cryptoHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '7b2afa1917mshcddb9d3eaabe66fp14797bjsn7a7b86f288a5'
};

const createQuery = (url) => {
    return {
        url,
        headers: cryptoHeaders
    }
}

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl 
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createQuery(`/coins`)
        }),
        getCryptoDetails: builder.query({
            query: (cryptoId) => createQuery(`/coin/${cryptoId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ cryptoId, timePeriod }) => createQuery(`coin/${cryptoId}/history/${timePeriod}`)
        }) 
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;


// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/stats',
//     headers: {
//         'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//         'x-rapidapi-key': '7b2afa1917mshcddb9d3eaabe66fp14797bjsn7a7b86f288a5'
//     }
// };