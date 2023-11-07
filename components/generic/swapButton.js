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
        <div style={{
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
            display: "inline-block",
            overflow: "visible",
            writingMode: "vertical-rl",
            justifyContent: "center",
            alignContent: "center",
            textOrientation: "mixed",
        }}>
            <button 
                onClick={onAbilitySwap}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    fontSize: `${scale * 32}px`,
                    borderLeft: "2px solid grey", //called border left but appears on right because we rotated button 180 so writingMode would work properly
                    background: `${selected}`,
                    whiteSpace: "nowrap",
                    overflow: "visible",
                    writingMode: "vertical-rl",
                    justifyContent: "center",
                    alignContent: "center",
                    textOrientation: "mixed",
                }}
                >
                    SWAP
            </button>
        </div>
    )
}