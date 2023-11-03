export default function use4d6Drop() {

    // `die` is how many sides are on the dice we're rolling
    function rollDice(numberOfDice = 1, die = 20) {
        let rolls = []
        for(let i = 0; i < numberOfDice; i++) {
            rolls.push(Math.floor(Math.random()* die) + 1)
        }
        return rolls
    }

    function generate4d6DropLowest() {
        return rollDice(4, 6).sort()
    }

    function getStatTotalFrom4d6(fourDsixValues) {
        let sum = 0;
        for(let i = 1; i < fourDsixValues.length; i++) {
            sum += fourDsixValues[i].reduce((x, y) => x + y)
        }
        return sum
    }

return {
    generate4d6DropLowest,
    getStatTotalFrom4d6
    }
}