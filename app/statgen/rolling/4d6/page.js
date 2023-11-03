"use client"
import { useState } from "react";
import use4d6Drop from "./use4d6Drop";
import text4d6Drop from "@/components/4d6Drop/text4d6Drop";
import Card4Set from "@/components/4d6Drop/card4Set";
import SortButtons from "@/components/cardDraw/sortButtons";

export default function Page() {

    const [viewWidth, setViewWidth] = useState(1100)
    const [fourDsixStats, setFourDsixStats] = useState(null);
    const [abilitySwap, setAbilitySwap] = useState(null)
    const abilityArr = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]

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

    function doAbilitySwap(abilityIdx) {
        let isFound = abilitySwap === abilityIdx
        if(!isFound) {
            if(abilitySwap !== null) {
                let output = []
                for(let i = 0; i < fourDsixStats.length; i++) {
                    if(i === abilityIdx) {
                        output.push(fourDsixStats[abilitySwap])
                    } else if(i === abilitySwap) {
                        output.push(fourDsixStats[abilityIdx])
                    } else {
                        output.push(fourDsixStats[i])
                    }
                }
                setFourDsixStats(output)
                setAbilitySwap(null)
            } else if (abilitySwap === null) { // abilitySwap === null means nothing is saved yet, so save a value.
                setAbilitySwap(abilityIdx)
            }
        } else { //found somewhere
            // if we find our element in there we want to remove it
            // simulating the user unselecting their current option.
            setAbilitySwap(null)
        }
    }

    return (
        <>
        <h1> 4d6 Drop Lowest</h1>
        <p>This method involves rolling 4d6 then adding up the 3 highest values and ignoring the 4th, lowest value.</p>
            <button className="clickButton" onClick={handle4d6}>
                Generate 4d6 drop lowest:
            </button>
            <br />
            {fourDsixStats && 
                <h3>
                    For a stat total of: <span style={{textDecorationLine: "underline"}}><strong>{getStatTotalFrom4d6(fourDsixStats)}</strong></span>
                </h3>
            }
            {fourDsixStats && <SortButtons setViewWidth={setViewWidth} componentWidth={485}/>}
            <div style={{display: "flex", flexWrap: "wrap", maxWidth: `${viewWidth}px`}}>
                {fourDsixStats && fourDsixStats.map(
                    (set, i) => 
                    <Card4Set key={i} cardValues={set} initialAbility={abilityArr[i]} onCardSwap={null} onAbilitySwap={() => doAbilitySwap(i)} abilitySwap={abilitySwap}/>
                )}
            </div>
           
        </>
    )
}