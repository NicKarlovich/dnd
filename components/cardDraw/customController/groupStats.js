export default function GroupStats({cardCount, statTotal}) {

    const MAX = 18;

    return (
        <div style={{display: 'block', paddingLeft: '20px'}}>
            <p># of Cards: <span className={cardCount > MAX ? "error" : "good"}> {cardCount} </span> / {MAX}</p>
            <br></br>
            <p>Stat Point Total: {statTotal}</p>
        </div>
    )
}