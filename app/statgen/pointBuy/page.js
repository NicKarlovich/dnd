"use client"
import AbilityScoreDisplay from "@/components/pointBuy/abilityScoreDisplay"
import usePointBuy from "./usePointBuy"
import PointBuyStats from "@/components/pointBuy/pointBuyStats"

export default function Page() {

    const {
        str, setStr, dex, setDex, con, setCon, int, setInt, wis, setWis, cha, setCha,
        handleIncrease, handleDecrease, 
        points, maxPoints,
        maxAbilityScore,
    } = usePointBuy()

    return (
        <div style={{marginLeft: "5px"}}>
            <h2>
                Point Buy Method
            </h2>

            Point Buy is where the

            <div style={{
                    display: "flex"
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                }}
                >
                    <AbilityScoreDisplay abilityScore={str} abilityScoreText={"STR"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={dex} abilityScoreText={"DEX"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={con} abilityScoreText={"CON"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={int} abilityScoreText={"INT"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={wis} abilityScoreText={"WIS"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={cha} abilityScoreText={"CHA"} handleDecrease={handleDecrease} handleIncrease={handleIncrease} maxAbilityScore={maxAbilityScore}/>
                    <PointBuyStats maxPoints={maxPoints} points={points}/>
                </div>
            </div>
            
        </div>
    )
}