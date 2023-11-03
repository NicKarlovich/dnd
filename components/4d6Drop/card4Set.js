import { useState } from "react";
import { EB_Garamond } from 'next/font/google'
import ModDisplay from "../generic/modDisplay";
import PlayingCard from "../generic/playingCard";
import SwapButton from "../generic/swapButton";

const eb_garamond = EB_Garamond({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

export default function Card4Set({ cardValues, initialAbility, index = -1, onCardSwap, cardSwap = null, onAbilitySwap, abilitySwap}) {

    const [scale, setScale] = useState(window.innerWidth > 375 ? 1 : Math.max(window.innerWidth / 375, 0.5))
    cardValues = cardValues.sort()
    window.addEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        
        if(windowWidth > 375) {
            setScale(1)
        } else {
            setScale(Math.max(windowWidth / 375, 0.5))
        }
        console.log(scale)
    });

    return (
        <div 
            className={eb_garamond.className} 
            style={{
                border: "2px solid grey",
                width: `${scale * 485}px`,
                marginRight: "3px",
                marginTop: "3px",
            }}
        >
            <div style={{
                display: "flex",
            }}>
                <ModDisplay //slice(1) to not count 1st value
                    abilityScore={cardValues.slice(1).reduce((prev, cur) => prev + cur, 0)} 
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
                        (card, i) => 
                        (
                            <div style={{
                                paddingTop: `${scale * 5}px`,
                                paddingBottom: `${scale * 5}px`,
                                paddingLeft: `${i === 1 ? 0 : scale * 5}px`,
                                paddingRight: `${i === 2 || i === 1 ? 0 : scale * 5}px`,
                            }}>
                                <PlayingCard 
                                    val={card} 
                                    scale={scale} 
                                    totalPosition={3 * index + i}
                                    onCardSwap={onCardSwap}
                                    cardSwap={cardSwap}
                                    doNotCount={i === 0}
                                    isDisabled={true}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}