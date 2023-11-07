import { useEffect, useState } from "react"

export default function SwapButton({scale, onAbilitySwap, abilitySwap, index}) {

    const [selected, setSelected] = useState("#000000") // black is not selected, green is selected.

    useEffect(() => {
        if(abilitySwap === index) {
            setSelected("#158000") //green
        } else if(abilitySwap !== null) {
            setSelected("#0077B3") // can be swapped blue
        } else if(abilitySwap === null) {
            setSelected("#000000") //black
        }
    }, [abilitySwap])

    return (
        <div className="rotateText"
            style={{
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
            display: "inline-block",
            overflow: "visible",
            justifyContent: "center",
            alignContent: "center",
        }}>
            <button 
                onClick={onAbilitySwap}
                className="rotateText"
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    fontSize: `${scale * 32}px`,
                    borderLeft: "2px solid grey", //called border left but appears on right because we rotated button 180 so writingMode would work properly
                    background: `${selected}`,
                    whiteSpace: "nowrap",
                    overflow: "visible",
                    alignContent: "center",
                    justifyContent: "center",
                }}
                >
                    <span className="rotateText">
                        SWAP
                    </span>
            </button>
        </div>
    )
}