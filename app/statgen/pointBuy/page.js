"use client"
import AbilityScoreDisplay from "@/components/pointBuy/abilityScoreDisplay"
import usePointBuy from "./usePointBuy"
import PointBuyStats from "@/components/pointBuy/pointBuyStats"
import HorizontalIncrementer from "@/components/pointBuy/horizontalIncrementer"

export default function Page() {

    const {
        str, dex, con,  int,  wis, cha,
        handleDec, handleInc,
        points, maxPoints, increaseMaxPoints, decreaseMaxPoints, 
        maxAbilityScore, minAbilityScore,
        pointValues, setPointValues,
        toggleCustomElements, useCustomPointBuy,
    } = usePointBuy()

    return (
        <div style={{marginLeft: "5px"}}>
            <h2>
                Point Buy Method
            </h2>

            Point Buy is where the

            <div style={{
                    display: "flex",
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: "center",
                    paddingBottom: "5px",
                    borderBottom: "2px solid grey"
                }}
                >
                    <AbilityScoreDisplay abilityScore={str} abilityScoreText={"STR"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={dex} abilityScoreText={"DEX"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={con} abilityScoreText={"CON"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={int} abilityScoreText={"INT"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={wis} abilityScoreText={"WIS"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <AbilityScoreDisplay abilityScore={cha} abilityScoreText={"CHA"} handleDecrease={handleDec} handleIncrease={handleInc} maxAbilityScore={maxAbilityScore} minAbilityScore={minAbilityScore}/>
                    <PointBuyStats maxPoints={maxPoints} points={points}/>
                </div>
            </div>
            <h3>Custom Modifiers</h3>
            <button className="clickButton" onClick={toggleCustomElements}>
                {useCustomPointBuy ? "Disable Custom Modifiers?" : "Enable Custom Modifiers?"}
            </button>
            {useCustomPointBuy && (
                <>
                    <h4>Modify Point Budget</h4>
                    <HorizontalIncrementer
                        currentVal={maxPoints}
                        upFunction={increaseMaxPoints}
                        downFunction={decreaseMaxPoints}
                    />
                    <h3>Point Amount</h3>
                    Here you can modify the number of points for each score
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        maxWidth: "500px",
                        flexWrap: "wrap",
                    }}>
                    { 
                        Object.entries(pointValues).map((abilityScore) => 
                        (
                            <div style={{borderRight: "3px solid grey"}}>
                                <HorizontalIncrementer
                                    currentVal={abilityScore[1]}
                                    /* this is the most cursed javascript I'll ever write
                                        the map returns an array of two objects, the first is the key, the second the value
                                        the key is the numerical value of the ability score,
                                        the value is the number of points granted to the score builder by using that number
                                        for example, 
                                            [8, 0] the score 8 grants 0 points
                                            [15, 9] the ability score 15 grants 9 points
                                            [7, -1] the ability score 7 grants -1 points
                                        So this setter is saying, 
                                            take existing pointValues, 
                                            spread them out using ...
                                            add/overwrite a this horizontalIncrementer's abilityScore (say 8, 15, or 7 in above example) value
                                            with the old value + 1 or - 1 depending on if the user clicked the + or - button in the incrementer

                                        I will admit, the double [[]] for [abilityScore[0]] is so cursed, don't even know how it works, thx chatGPT
                                        I would think it would be pointValues[abilityScore[0]], but that doesn't work... somehow this does and I'm not questioning it.
                                    */
                                    upFunction={() => setPointValues({...pointValues, [abilityScore[0]]: abilityScore[1] + 1})}
                                    downFunction={() => setPointValues({...pointValues, [abilityScore[0]]: abilityScore[1] - 1})}
                                    horizontalLabel={
                                        <div style={{"paddingRight": "5px"}}>
                                            <h3>{abilityScore[0]}</h3>
                                        </div>
                                    }
                                    redGreenGradientValue={true}
                                />
                            </div>
                        )
                    )  
                    }
                    </div>
                </>
            )}
            
        </div>
    )
}
