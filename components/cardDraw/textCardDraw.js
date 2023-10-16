export default function textCardDraw(set, index) {

    const text = `${set[0]}, ${set[1]}, ${set[2]}`
    const sum = `${set.reduce((x, y) => x + y)}`

    return <p key={index}> Set {index}: [ {text} ] = {sum}</p>
}