import React from 'react'
import '../styles/globals.css'
import { AppProps as NextAppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
  pageProps: P
} & Omit<NextAppProps<P>, 'pageProps'>

function MyApp ({ Component, pageProps }: AppProps) {
  // To make sure data is not shared between users and request
  const queryClient = React.useRef(new QueryClient())
  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
