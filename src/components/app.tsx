'use client'
import Header from './header'
import Footer from './footer'
export default function App({children}: {children: any}) {
    return (<>
        <Header />
        <div className="app">
            {children}
        </div>
        <Footer />
    </>)
}