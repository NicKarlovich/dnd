"use client"
import ModDisplay from "@/components/generic/modDisplay";
import Link from "next/link";
import { EB_Garamond } from 'next/font/google'

const eb_garamond = EB_Garamond({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

export default function Page() {

    const standardArray = [15, 14, 13, 12, 10, 8]


    return (
        <div style={{marginLeft: "5px"}}>
            <h2>
                Standard Array
            </h2>

            Standard array is where every player is given a set of values that can be re-ordered, but not changed.  
            This has the benefit of removing variance from ability score generation.
            It also means that every player character is given the same starting point for ability scores, so there is no room for argument that "one player got luckier during ability score generation, so that's why their character is better"
            <br />
            <br />
            The downsides are that it is generally considered boring as it offers no varaince or randomness to different characters,
            which is something D&D players typically look for. I mean, we roll d20's to hit instead of just dealing static average damage for a static average percentage of attacks.
            <br />
            <br />
            When people say they use "standard array" they most likely mean the following standard array:
            <br />
            <h3> Standard Array</h3>
            <br />
            <div
                className={eb_garamond.className}  
                style={{
                    display: "flex",
                    borderLeft: "2px solid grey",
            }}>
                {standardArray.map((val, i) => 
                    <ModDisplay abilityScore={val} scale={1} defaultAbility={null} />
                )}
            </div>
            <br />
            <br />
            You could modify the standard array slightly for your campaign, but Standard Array has been tried and true 
            for many years (almost a decade at this point) and if you're looking for some customization aspect in your character creation,
            I'd suggest looking at <Link className="link" href="/statgen/pointBuy">Point Buy</Link>


        </div>
    )
}