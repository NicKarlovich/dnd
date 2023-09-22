export default function text4d6Drop(dropped, otherValues, withTotal = true, index) {

    const fourDsixOutput = `${otherValues[0]}, ${otherValues[1]}, ${otherValues[2]}`
    const sum = withTotal ? ` = ${otherValues.reduce((x, y) => x + y)}`: ''

    return <p> Stat {index}: [ 
        <span style={{color: "red"}}>{dropped}</span>, {fourDsixOutput} 
    ]{sum}
    </p>
}