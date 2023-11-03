export default function PlusMinusButton({isUp, onClick, isDisabled = false}) {

    return (
        <>
            <button disabled={isDisabled} className="counterButton" onClick={onClick}>
            <p style={{paddingBottom: "1px"}}>
                {isUp ? "+" : "-"}
            </p>
            </button>
        </>
    )
}