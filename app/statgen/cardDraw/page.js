"use client"

import { useState } from "react";
import useCardDraw from "./useCardDraw";
import useCustomCardDraw from "./useCustomCardDraw"
import textCardDraw from "@/components/cardDraw/textCardDraw";
import GroupStats from "@/components/cardDraw/customController/groupStats";

export default function Page() {

    const [cardDraw, setCardDraw] = useState(null)

    const {
        upgraded,
        originalDeployment,
        doCardDraw
    } = useCardDraw()

    const {
        sixUnit,
        fiveUnit,
        fourUnit,
        threeUnit,
        twoUnit,
        oneUnit,
        statTotal,
        cardTotal,
        distribution,
        setDistribution,
        convertDistributionToNumArray,
    } = useCustomCardDraw()

    const handleOriginal = () => {
        setCardDraw(doCardDraw(originalDeployment));
    }

    const handleModified = () => {
        setCardDraw(doCardDraw(upgraded));
    }

    const generateCardDraw = () => {
        setCardDraw(doCardDraw(convertDistributionToNumArray(distribution)))
    }


    return (
        <>
        <h2>Card Draw Method</h2>
            Card Draw is a method where you take a deck of 18 cards, typically with values between 1 - 6, and shuffle them.  Then, you deal them out in stacks of 3.  The total sum of each stack of three makes up one of your ability scores.
            <br />
            <br />
            Because this is being done online, some of the visual effect is lost, but mechanically it can be simulated, and seen as essentially shuffling a set of numbers around to create ability scores rather than rolling for them, which has the added benefit of being able to control the total ability score total and more of the deviations in ability scores.
            <br />
            <br />
            Provided below are some common presets of the distributions of these cards.
            <br/>
            <br/>
            <button onClick={
                () => setDistribution({six: 3, five: 4, four: 4, three: 4, two: 3, one: 0})}>
            {/* <button onClick={handleOriginal}> */}
                Set Standard Preset [Total 72]

            </button>
            <br/>
            <button onClick={
                () => setDistribution({six: 4, five: 4, four: 3, three: 4, two: 2, one: 1})}>
            {/* <button onClick={handleModified}> */}
                Set Modified Preset [Total 74]
                {/* Generate Card Draw for Modified Stats: */}
            </button>
            <h3>Card Draw</h3>
            <div className="customCardSet">
            {sixUnit} {fiveUnit} {fourUnit} {threeUnit} {twoUnit} {oneUnit} <GroupStats cardCount={cardTotal} statTotal={statTotal}/>
            </div>
            <button onClick={generateCardDraw}>
                Generate Card Draw
            </button>
            {cardDraw && cardDraw.map((set, i) => textCardDraw(set, i))}
        </>
    )
}