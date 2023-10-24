import { useState } from "react"

export default function usePointBuy() {

    const [str, setStr] = useState(8)
    const [dex, setDex] = useState(8)
    const [con, setCon] = useState(8)
    const [int, setInt] = useState(8)
    const [wis, setWis] = useState(8)
    const [cha, setCha] = useState(8)
    const [points, setPoints] = useState(0)
    const [maxAbilityScore, setMaxAbilityScore] = useState(15)
    const [maxPoints, setMaxPoints] = useState(27)

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
        handleDecrease, handleIncrease,
        points, maxPoints,
        maxAbilityScore,
    }
}