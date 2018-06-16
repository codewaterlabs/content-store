import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../src/withApolloClient'
import { ApolloProvider } from 'react-apollo'
import { getCookie, UserContext } from "../src/session"


class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        // Get user data which should also work ssr
        const userData = {
            token: getCookie("token", ctx.req),
            name: getCookie("name", ctx.req)
        }

        return { pageProps, userData }
    }

    render() {
        const { Component, pageProps, apolloClient, userData } = this.props
        // Provide userData through react context
        return <Container>
            <ApolloProvider client={apolloClient}>
                <UserContext.Provider value={userData}>
                    <Component {...pageProps} />
                </UserContext.Provider>
            </ApolloProvider>
        </Container>
    }
}

export default withApolloClient(MyApp)