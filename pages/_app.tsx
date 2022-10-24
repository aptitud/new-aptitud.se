import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="w-screen bg-gradient-to-r from-aptitud-3 to-aptitud-4">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
