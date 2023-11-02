"use client"
import { useState } from "react";
import use4d6Drop from "./use4d6Drop";
import text4d6Drop from "@/components/4d6Drop/text4d6Drop";

export default function Page() {

    const [fourDsixStats, setFourDsixStats] = useState(null);

    const {
        generate4d6DropLowest,
        getStatTotalFrom4d6
    } = use4d6Drop()

    const handle4d6 = () => {
        setFourDsixStats(
            [
                generate4d6DropLowest(),
                generate4d6DropLowest(),
                generate4d6DropLowest(),
                generate4d6DropLowest(),
                generate4d6DropLowest(),
                generate4d6DropLowest()
            ]
        )
    }

    return (
        <>
        <h1> 4d6 Drop Lowest</h1>
        <p>This method involves rolling 4d6 then adding up the 3 highest values and ignoring the 4th, lowest value.</p>
            <button className="clickButton" onClick={handle4d6}>
                Generate 4d6 drop lowest:
            </button>
            {fourDsixStats && fourDsixStats.map((abilityScore, i) => text4d6Drop(abilityScore.dropped, abilityScore.value, true, i + 1))}
            {fourDsixStats && 
                <>
                    For a stat total of: {getStatTotalFrom4d6(fourDsixStats)}
                </>
            }
        </>
    )
}