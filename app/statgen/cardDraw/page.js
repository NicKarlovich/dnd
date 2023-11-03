"use client"
import { useState } from "react";
import useCardDraw from "./useCardDraw";
import useCustomCardDraw from "./useCustomCardDraw"
import textCardDraw from "@/components/cardDraw/textCardDraw";
import GroupStats from "@/components/cardDraw/customController/groupStats";
import Card3Set from "@/components/cardDraw/card3Set/card3set";
import SortButtons from "@/components/cardDraw/sortButtons";

export default function Page() {

    const [viewWidth, setViewWidth] = useState(1100)

    const [cardDraw, setCardDraw] = useState(null)
    const abilityArr = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
    const [swap, setSwap] = useState(null)

    /*
    There can only ever be 1 element in swap
    if we get a 2nd variable, we do the swap
    its essentially a boolean. so we can write some kinda
    weird logic here where we just ignore cases we don't allow to occur.

    */
    function doSwap(indexOfSwap) {
        let isFound = swap === indexOfSwap

        if (!isFound) { // not found , 2 possibilities
            if(swap !== null) { // swap !== null means there is an int of another swappable index
                //do swap logic

                //convert indicies into cardDraw 2D indicies
                let val1Idx_i = Math.floor(indexOfSwap / 3)
                let val1Idx_j = indexOfSwap % 3

                let val2Idx_i = Math.floor(swap / 3)
                let val2Idx_j = Math.floor(swap % 3)

                // save current values
                let val1 = cardDraw[val1Idx_i][val1Idx_j]
                let val2 = cardDraw[val2Idx_i][val2Idx_j]

                // make copy
                var newCardDraw = cardDraw

                //set values in new array
                newCardDraw[val1Idx_i][val1Idx_j] = val2
                newCardDraw[val2Idx_i][val2Idx_j] = val1

                setCardDraw(newCardDraw)
                setSwap(null)
            } else if (swap === null) { // swap === null means nothing is saved yet, so save a value.
                setSwap(indexOfSwap)
            }
        } else { //found somewhere
            // if we find our element in there we want to remove it
            // simulating the user unselecting their current option.
            setSwap(null)
        }
    }

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
        <div 
        style={{marginLeft: "5px"}}
        >
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
            <button className="clickButton" onClick={
                () => setDistribution({six: 3, five: 4, four: 4, three: 4, two: 3, one: 0})}>
                Set Standard Preset [Total 72]
            </button>
            {/* <br/> */}
            <button className="clickButton" onClick={
                () => setDistribution({six: 4, five: 4, four: 4, three: 3, two: 2, one: 1})}>
                Set Modified Preset [Total 74]
            </button>
            <h3>Card Draw</h3>
            <div className="customCardSet">
            {sixUnit} {fiveUnit} {fourUnit} {threeUnit} {twoUnit} {oneUnit} <GroupStats cardCount={cardTotal} statTotal={statTotal}/>
            </div>
            <button 
                className="clickButton"
                onClick={cardTotal === 18 ? generateCardDraw : () => {}}>
                Generate Card Draw
            </button>
            {cardDraw && cardDraw.map((set, i) => textCardDraw(set, i))}
            {cardDraw && <SortButtons setViewWidth={setViewWidth} componentWidth={350}/>}
            <div style={{display: "flex", flexWrap: "wrap", maxWidth: `${viewWidth}px`}}>
            {cardDraw && cardDraw.map(
                (set, i) => 
                <Card3Set 
                    cardValues={set} 
                    initialAbility={abilityArr[i]}
                    index={i}
                    onSwap={doSwap}
                    swap={swap}
                />
                )}

{/* for debugging look of cards */}
            {cardDraw && false && (
                <>
                    <Card3Set cardValues={[6, 6, 8]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 7]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 6]} initialAbility={"DEX"} onSwap={console.log('ban')}/> 
                    <Card3Set cardValues={[6, 6, 5]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 4]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 3]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 2]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 1]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 0]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -1]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -2]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -3]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -4]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -5]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -6]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -7]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -8]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -9]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -10]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -11]} initialAbility={"DEX"} onSwap={console.log('ban')}/>
                </>
                )}
            </div>
            <div style={{height: "1000px"}}></div>
        </div>
    )
}