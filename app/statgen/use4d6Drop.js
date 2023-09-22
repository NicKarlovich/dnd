export default function use4d6Drop() {

    // `die` is how many sides are on the dice we're rolling
    function rollDice(numberOfDice = 1, die = 20) {
        let rolls = []
        for(let i = 0; i < numberOfDice; i++) {
            rolls.push(Math.floor(Math.random()* die) + 1)
        }
        console.log("roll dice", rolls)
        return rolls
    }

    function dropLowest(diceRolls) {

        let min = Math.min(...diceRolls)
        let dropped = diceRolls.splice(diceRolls.indexOf(min), 1); //2nd parameter says remove only 1 
        return { 
            value: diceRolls.sort(),
            dropped: dropped
        }
    }

    function generate4d6DropLowest() {
        return dropLowest(rollDice(4, 6));
    }

    function getStatTotalFrom4d6(fourDsixValues) {
        let sum = 0;
        
        for(let i = 0; i < fourDsixValues.length; i++) {
            sum += fourDsixValues[i].value.reduce((x, y) => x + y)
        }
        return sum
    }

return {
    generate4d6DropLowest,
    getStatTotalFrom4d6
    }
}