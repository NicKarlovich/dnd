export default function PointBuyStats({maxPoints, points}) {

    return (
        <div style={{display: 'block', paddingLeft: '20px'}}>
            <p>Point Budget: <span style={{"whiteSpace": "nowrap"}}><span className={points === maxPoints ? "good" : (points === 0 ? "white" : "warn")}> {points} </span> / {maxPoints}</span></p>
        </div>
    )
}