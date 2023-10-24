"use client"
import Link from "next/link"

export default function Page() {

    return (
        <>
            <h1>Stat Generation Page</h1>
            Here you'll find a list of different methods for generating stats for a player character in dnd5e
            <li>
                <Link className="link" href="statgen/rolling/4d6">4d6</Link>
            </li>
            <li>
                <Link className="link" href="statgen/cardDraw">Card Draw</Link>
            </li>
            <li>
                <Link className="link" href="statgen/standardArray">Standard Array</Link>
            </li>
            <li>
                <Link className="link" href="statgen/pointBuy">Point Buy</Link>
            </li>
        </>
    )
}