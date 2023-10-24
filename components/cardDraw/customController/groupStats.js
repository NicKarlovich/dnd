export default function GroupStats({cardCount, statTotal}) {

    const NUM_CARDS = 18;

    return (
        <div style={{display: 'block', paddingLeft: '20px'}}>
            <p># of Cards: <span style={{"whiteSpace": "nowrap"}}><span className={cardCount != NUM_CARDS ? "error" : "good"}> {cardCount} </span> / {NUM_CARDS}</span></p>
            <br></br>
            <p 
            style={{paddingRight: "5px"}}
            >Stat Point Total: {statTotal}</p>
        </div>
    )
}