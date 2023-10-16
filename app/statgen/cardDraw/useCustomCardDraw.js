import CustomController from '@/components/cardDraw/customController/customController';
import shuffle from 'just-shuffle';
import { useEffect, useState } from 'react';

export default function useCardDraw() {

    const [numSix, setNumSix] = useState(3)
    const [numFive, setNumFive] = useState(4)
    const [numFour, setNumFour] = useState(4)
    const [numThree, setNumThree] = useState(4)
    const [numTwo, setNumTwo] = useState(3)
    const [numOne, setNumOne] = useState(0)
    const [statTotal, setStatTotal] = useState(72)
    const [cardTotal, setCardTotal] = useState(18)
    const [distribution, setDistribution] = useState({six: numSix, five: numFive, four: numFour, three: numThree, two: numTwo, one: numOne}) // write in state from presets

    useEffect(() => {
        setStatTotal(numSix * 6 + numFive * 5 + numFour * 4 + numThree * 3 + numTwo * 2 + numOne * 1)
        setCardTotal(numSix + numFive + numFour + numThree + numTwo + numOne)
    }, [numSix, numFive, numFour, numThree, numTwo, numOne])

    useEffect(() => {
        setNumSix(distribution?.six > -1 ? distribution.six : numSix)
        setNumFive(distribution?.five > -1 ? distribution.five : numFive)
        setNumFour(distribution?.four > -1? distribution.four : numFour)
        setNumThree(distribution?.three > -1 ? distribution.three : numThree)
        setNumTwo(distribution?.two > -1 ? distribution.two : numTwo)
        setNumOne(distribution?.one > -1 ? distribution.one : numOne)
    }, [distribution])
    
    const originalDeployment = [6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2]
    
    const originalDeploymentDescription = "3x6, 4x5/4/3, 3x2, total 72"
    // const upgradedDescription = "4x6/5, 3x4, 4x3, 2x2, 1x1, total 74"

    let sixUnit = <CustomController currentVal={numSix} updateFunction={setNumSix} dieVal={6}/>
    let fiveUnit = <CustomController currentVal={numFive} updateFunction={setNumFive} dieVal={5}/>
    let fourUnit = <CustomController currentVal={numFour} updateFunction={setNumFour} dieVal={4}/>
    let threeUnit = <CustomController currentVal={numThree} updateFunction={setNumThree} dieVal={3}/>
    let twoUnit = <CustomController currentVal={numTwo} updateFunction={setNumTwo} dieVal={2}/>
    let oneUnit = <CustomController currentVal={numOne} updateFunction={setNumOne} dieVal={1}/>

    const convertDistributionToNumArray = (dist) => {
        let out = []
        console.log(dist)
        for(const [key, val] of Object.entries(dist)) {
            // console.log(key, val)
            for(let i = 0; i < val; i++) {
                console.log(key, val)
                switch (key) {
                    case "six":
                        console.log('six')
                        out.push(6)
                        break;
                        // return
                    case "five":
                        console.log('five')
                        out.push(5)
                        break;
                        // return
                    case "four":
                        console.log('four')
                        out.push(4)
                        break;
                        // return
                    case "three":
                        console.log('three')
                        out.push(3)
                        break;
                        // return
                    case "two":
                        console.log('two')
                        out.push(2)
                        break;
                        // return 
                    case "one":
                        console.log('one')
                        out.push(1)
                        break;
                        // return
                    default:
                        console.log('zero')
                        out.push(0)
                        break;
                        // return
                }
                
            }
        }   
        console.log(out)
        return out
    }


    return {
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
    }
}