import { useState } from "react";
import ModDisplay from "../../generic/modDisplay";
import PlayingCard from "../../generic/playingCard";
import { EB_Garamond } from 'next/font/google'
import SwapButton from "@/components/generic/swapButton";

const eb_garamond = EB_Garamond({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

export default function Card3Set({ cardValues, initialAbility, index = -1, onCardSwap, cardSwap = null, onAbilitySwap = () => {}, abilitySwap}) {
    
    // const [scale, setScale] = useState(window.innerWidth > 425 ? 1 : Math.max(window.innerWidth / 425, 0.5))
    const [scale, setScale] = useState(
        window.matchMedia("(max-width: 800px)").matches 
        ? Math.max(window.innerWidth / 800, 0.5) 
        : (
            window.innerWidth > 425 
            ? 1 
            : Math.max(window.innerWidth / 425, 0.5)
          )
        )

    window.addEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        
        if(windowWidth > 425) {
            setScale(1)
        } else {
            setScale(Math.max(windowWidth / 425, 0.5))
        }
        console.log(scale)
    });

    return (
        <div 
            className={eb_garamond.className} 
            style={{
                border: "2px solid grey",
                width: `${scale * 400}px`,
                marginRight: "3px",
                marginTop: "3px",
            }}
        >
            <div style={{
                display: "flex",
            }}>
                <ModDisplay 
                    abilityScore={cardValues.reduce((prev, cur) => prev + cur, 0)} 
                    scale={scale} 
                    defaultAbility={initialAbility}/>
                <SwapButton 
                    scale={scale} 
                    onAbilitySwap={onAbilitySwap} 
                    abilitySwap={abilitySwap}
                    index={index}
                />
                <div style={{
                    display: "flex",
                }}>
                    {cardValues.map(
                        (card, i) => {
                            let flattenedIdx = 3 * index + i
                            return (
                                <div style={{
                                    paddingTop: `${scale * 5}px`,
                                    paddingBottom: `${scale * 5}px`,
                                    paddingLeft: `${i === 1 ? 0 : scale * 5}px`,
                                    paddingRight: `${i === 1 ? 0 : scale * 5}px`,
                                }}>
                                    <PlayingCard 
                                        val={card} 
                                        scale={scale} 
                                        totalPosition={flattenedIdx}
                                        onCardSwap={() => onCardSwap(flattenedIdx)}
                                        cardSwap={cardSwap}
                                    />
                                </div>
                            )
                        }
                        
                    )}
                </div>
            </div>
        </div>
    )
}