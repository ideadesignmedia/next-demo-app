import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (<header>
        <h2>User App</h2>
        <Link href="/">Home</Link>
    </header>)
}