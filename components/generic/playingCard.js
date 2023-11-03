import Head from "next/head"
import { useEffect, useState } from "react"


export default function PlayingCard({ val, scale, totalPosition, onSwap, swap, doNotCount = false, isDisabled = false}) {

    let cardRatio = 3.5/2.5
    let desktopWidth = 80 * scale
    const [selected, setSelected] = useState("#FFFFFF") // white is not selected, green is selected.

    let backgroundColor = doNotCount ? "#FF0000" : `${selected}`

    useEffect(() => {
        if(swap === totalPosition) {
            setSelected("#00FF00") //green
        } else {
            setSelected("#FFFFFF") //white
        }
    }, [swap])
    
    return (
        <>
            <button 
                onClick={() => {
                    onSwap(totalPosition)
                }}
                style={{
                    borderRadius: `${desktopWidth / 12}px`,
                    display: 'flex', 
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: `${desktopWidth * cardRatio}px`,
                    width: `${desktopWidth}px`,
                    background: backgroundColor
                }}
                disabled={isDisabled}
            >
                <span 
                    style={{
                        textAlign: "center", 
                        color: "black", 
                        fontSize: `${desktopWidth * 0.766}px`,
                    }}
                >
                    {val}
                </span>
            </button>
        </>
    )
}