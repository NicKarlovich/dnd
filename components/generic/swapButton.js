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
        <button 
            onClick={onAbilitySwap}
            style={{
                transform: "rotate(180deg)",
                fontSize: `${scale * 32}px`,
                writingMode: "vertical-rl",
                WebkitWritingMode: "vertical-rl",
                borderLeft: "2px solid grey", //called border left but appears on right because we rotated button 180 so writingMode would work properly
                background: `${selected}`
                }}
            >
                SWAP    
        </button>
    )
}