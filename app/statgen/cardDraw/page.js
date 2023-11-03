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
    const [cardSwap, setCardSwap] = useState(null)
    const [abilitySwap, setAbilitySwap] = useState(null)

    /*
    There can only ever be 1 element in cardSwap
    if we get a 2nd variable, we do the cardSwap
    its essentially a boolean. so we can write some kinda
    weird logic here where we just ignore cases we don't allow to occur.
    */
    function doCardSwap(indexOfSwap) {
        let isFound = cardSwap === indexOfSwap

        if (!isFound) { // not found , 2 possibilities
            if(cardSwap !== null) { // cardSwap !== null means there is an int of another swappable index
                //do cardSwap logic

                //convert indicies into cardDraw 2D indicies
                let val1Idx_i = Math.floor(indexOfSwap / 3)
                let val1Idx_j = indexOfSwap % 3

                let val2Idx_i = Math.floor(cardSwap / 3)
                let val2Idx_j = Math.floor(cardSwap % 3)

                // save current values
                let val1 = cardDraw[val1Idx_i][val1Idx_j]
                let val2 = cardDraw[val2Idx_i][val2Idx_j]

                // make copy
                var newCardDraw = cardDraw

                //set values in new array
                newCardDraw[val1Idx_i][val1Idx_j] = val2
                newCardDraw[val2Idx_i][val2Idx_j] = val1

                setCardDraw(newCardDraw)
                setCardSwap(null)
            } else if (cardSwap === null) { // cardSwap === null means nothing is saved yet, so save a value.
                setCardSwap(indexOfSwap)
            }
        } else { //found somewhere
            // if we find our element in there we want to remove it
            // simulating the user unselecting their current option.
            setCardSwap(null)
        }
    }

    // abilityIdx is an idx of the high level 3x1 array that contains the 3 card draws
    // todo in the future, possibly standarize this with 4d6 version.
    function doAbilitySwap(abilityIdx) {
        let isFound = abilitySwap === abilityIdx
        if(!isFound) {
            if(abilitySwap !== null) {
                let output = []
                // go through each set of 3
                //  if idx === one of the sets to swap, use the other set in it's place
                for(let i = 0; i < cardDraw.length; i++) {
                    if(i === abilityIdx) {
                        output.push(cardDraw[abilitySwap])
                    } else if(i === abilitySwap) {
                        output.push(cardDraw[abilityIdx])
                    } else {
                        output.push(cardDraw[i])
                    }
                }
                setCardDraw(output) //set new value
                setAbilitySwap(null) //clear swap setting
            } else if (abilitySwap === null) { // abilitySwap === null means nothing is saved yet, so save a value.
                setAbilitySwap(abilityIdx)
            }
        } else { 
            // if we find our element on a onClick event, that means the 
            //user is unselecting their current option.
            setAbilitySwap(null)
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
            {/* {cardDraw && cardDraw.map((set, i) => textCardDraw(set, i))} */}
            {cardDraw && <SortButtons setViewWidth={setViewWidth} componentWidth={400}/>}
            <div style={{display: "flex", flexWrap: "wrap", maxWidth: `${viewWidth}px`}}>
            {cardDraw && cardDraw.map(
                (set, i) => 
                    <Card3Set 
                        cardValues={set} 
                        initialAbility={abilityArr[i]}
                        index={i}
                        onCardSwap={doCardSwap}
                        cardSwap={cardSwap}
                        onAbilitySwap={() => doAbilitySwap(i)}
                        abilitySwap={abilitySwap}
                    />
                )}

{/* for debugging look of cards */}
            {/* {cardDraw && false && (
                <>
                    <Card3Set cardValues={[6, 6, 8]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 7]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 6]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/> 
                    <Card3Set cardValues={[6, 6, 5]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 4]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 3]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 2]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 1]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, 0]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -1]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -2]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -3]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -4]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -5]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -6]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -7]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -8]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -9]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -10]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                    <Card3Set cardValues={[6, 6, -11]} initialAbility={"DEX"} onCardSwap={console.log('ban')}/>
                </>
                )} */}
            </div>
            <div style={{height: "1000px"}}></div>
        </div>
    )
}