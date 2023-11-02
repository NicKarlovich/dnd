import { useEffect, useState } from "react"

export default function usePointBuy() {

    const POINT_BUY_FLOOR = 0
    const POINT_BUY_CAP = 100
    const DEFAULT_MAX_ABILITY_SCORE = 15
    const DEFAULT_MIN_ABILITY_SCORE = 8

    const DEFAULT_MAX_POINTS = 27

    const CUSTOM_MAX_ABILITY_SCORE = 18
    const CUSTOM_MIN_ABILITY_SCORE = 3

    const DEFAULT_POINT_VALUES = {
        3: -9,
        4: -6,
        5: -4,
        6: -2,
        7: -1,
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9,
        16: 12,
        17: 15,
        18: 19
    }

    const [str, setStr] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [dex, setDex] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [con, setCon] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [int, setInt] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [wis, setWis] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [cha, setCha] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [pointValues, setPointValues] = useState(DEFAULT_POINT_VALUES)
    const [useCustomPointBuy, setUseCustomPointBuy] = useState(false)
    const [points, setPoints] = useState(0) // computed based of str/dex/con/int/wis/cha
    const [maxAbilityScore, setMaxAbilityScore] = useState(DEFAULT_MAX_ABILITY_SCORE)
    const [minAbilityScore, setMinAbilityScore] = useState(DEFAULT_MIN_ABILITY_SCORE)
    const [maxPoints, setMaxPoints] = useState(DEFAULT_MAX_POINTS)

    useEffect(() => {
        setPoints(
            pointValues[str] + pointValues[dex] + pointValues[con] + 
            pointValues[int] + pointValues[wis] + pointValues[cha]
        )
    }, [str, dex, con, int, wis, cha, pointValues])

    function toggleCustomElements() {

        if(useCustomPointBuy) {
            setMaxAbilityScore(DEFAULT_MAX_ABILITY_SCORE)
            setMinAbilityScore(DEFAULT_MIN_ABILITY_SCORE)
            setPointValues(DEFAULT_POINT_VALUES)
            setStr(DEFAULT_MIN_ABILITY_SCORE)
            setDex(DEFAULT_MIN_ABILITY_SCORE)
            setCon(DEFAULT_MIN_ABILITY_SCORE)
            setInt(DEFAULT_MIN_ABILITY_SCORE)
            setWis(DEFAULT_MIN_ABILITY_SCORE)
            setCha(DEFAULT_MIN_ABILITY_SCORE)
            setMaxPoints(DEFAULT_MAX_POINTS)
            
        } else {
            setMaxAbilityScore(CUSTOM_MAX_ABILITY_SCORE)
            setMinAbilityScore(CUSTOM_MIN_ABILITY_SCORE)
        }
        setUseCustomPointBuy(!useCustomPointBuy)
    }

    function increaseMaxPoints() {
        if (maxPoints < POINT_BUY_CAP) {
            setMaxPoints(maxPoints + 1)
        }
    }

    function decreaseMaxPoints() {
        if (maxPoints > POINT_BUY_FLOOR) {
            setMaxPoints(maxPoints - 1)
        }
    }

    function convertTextToStateObj(text) {
        if(text === "STR") {
            return {val: str, setter: setStr}
        }
        if(text === "DEX") {
            return {val: dex, setter: setDex}
        }
        if(text === "CON") {
            return {val: con, setter: setCon}
        }
        if(text === "INT") {
            return {val: int, setter: setInt}
        }
        if(text === "WIS") {
            return {val: wis, setter: setWis}
        }
        if(text === "CHA") {
            return {val: cha, setter: setCha}
        }
    }

    function handleDec(ability) {
        handleStatChange(ability, -1)
    }

    function handleInc(ability) {
        handleStatChange(ability, +1)
    }

    function handleStatChange(ability, change) {
        let state = convertTextToStateObj(ability)
        if( state.val + change <= maxAbilityScore && state.val + change >= minAbilityScore
            ) { // if we're within bounds of max/min
            state.setter(state.val + change)
        } else {
            //do nothing, we're making a change outside the bounds of what we want.
        }

    }

    function handleDecrease(ability) {
        let state = convertTextToStateObj(ability)
        let pointValDiff;
        let scoreDiff;
        switch(state.val) {
            case 18:
            case 17:
            case 16:
                pointValDiff = 3
                scoreDiff = 1
                break;
            case 15:
            case 14:
                pointValDiff = -2
                scoreDiff = -1
                break;
            case 13:
            case 12:
            case 11:
            case 10:
            case 9:
                pointValDiff = -1
                scoreDiff = -1
            break;
            default:
                scoreDiff = 0
                pointValDiff = 0
        }
        setPoints(points + pointValDiff)
        state.setter(state.val + scoreDiff)
    }

    function handleIncrease(ability) {
        let state = convertTextToStateObj(ability)
        let pointValDiff;
        let scoreDiff;
        switch(state.val) {
            case 17:
            case 16:
                pointValDiff = 3
                scoreDiff = 1
                break;
            case 15:
            case 14:
            case 13:
                pointValDiff = 2
                scoreDiff = 1
                break;
            case 12:
            case 11:
            case 10:
            case 9:
            case 8:
                pointValDiff = 1
                scoreDiff = 1
            break;
            case 18:
            default:
                pointValDiff = 0
                scoreDiff = 0
        }
        if(points + pointValDiff <= maxPoints) {
            setPoints(points + pointValDiff)
            state.setter(state.val + scoreDiff)
        } else {
            //do nothing because we can't go over the max# of points
        }
        
    }

    return {
        str, setStr, dex, setDex, con, setCon, int, setInt, wis, setWis, cha, setCha,
        handleDecrease, handleIncrease, handleDec, handleInc,
        points, maxPoints, increaseMaxPoints, decreaseMaxPoints,
        maxAbilityScore, minAbilityScore,
        pointValues, setPointValues,
        toggleCustomElements, useCustomPointBuy,
    }
}