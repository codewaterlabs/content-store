import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client';
import { getCookie } from './session';
import { setContext } from 'apollo-link-context'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState, ctx = {}) {
    const uploadLink = createUploadLink({
        uri: 'http://localhost:4000', // Server URL (must be absolute)
        credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    })
    const authLink = setContext((_, { headers }) => {
        const token = getCookie('token', ctx.req)
        console.log("Token=", token)
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    })
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(uploadLink),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState, ctx = {}) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, ctx)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}