import { useEffect, useState } from "react";
import ModDisplay from "./modDisplay";
import PlayingCard from "./playingCard";
import { EB_Garamond } from 'next/font/google'

const eb_garamond = EB_Garamond({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})




export default function Card3Set({ cardValues, initialAbility, index = -1, onSwap, swap = null}) {

    const [scale, setScale] = useState(window.innerWidth > 375 ? 1 : Math.max(window.innerWidth / 375, 0.5))

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
                width: `${scale * 350}px`,
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
                                paddingRight: `${i === 1 ? 0 : scale * 5}px`,
                            }}>
                                <PlayingCard 
                                    val={card} 
                                    scale={scale} 
                                    totalPosition={3 * index + i}
                                    onSwap={onSwap}
                                    swap={swap}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}