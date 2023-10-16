"use client"
import Link from "next/link"

export default function Page() {

    return (
        <>
            <h1>Stat Generation Page</h1>
            Here you'll find a list of different methods for generating stats for a player character in dnd5e
            <li>
                <Link href="statgen/rolling/4d6">4d6</Link>
            </li>
            <li>
                <Link href="statgen/cardDraw">Card Draw</Link>
            </li>
        </>
    )
}