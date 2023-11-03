import { useEffect, useState } from "react";

export default function ModDisplay({ abilityScore, scale, defaultAbility }) {

    const [ability, setAbility] = useState("STR");
    // console.log("default ability", defaultAbility)
    // console.log(" ability", ability)

    useEffect(() => {
        setAbility(defaultAbility)
    }, [])

    function cycleAbility() {
        // console.log("abc, ", ability)
        if (ability === "STR") {
            setAbility("DEX")
        } else if(ability === "DEX") {
            setAbility("CON")
        } else if(ability === "CON") {
            setAbility("INT")
        } else if(ability === "INT") {
            setAbility("WIS")
        } else if(ability === "WIS") {
            setAbility("CHA")
        } else if(ability === "CHA") {
            setAbility("STR")
        }
    }

    let mod = Math.floor((abilityScore - 10) / 2)
    let modText;
    if(mod > 0) {
        modText = `+${mod}`
    } else if(mod < 0) {
        modText = `-${Math.abs(mod)}`
    } else {
        modText = "0"
    }

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "2px solid grey",
            minWidth: `${scale * 86}px`,
            width: `${scale * 86}px`,
        }}>
            <button 
                onClick={cycleAbility}
                style={{
                justifyContent: "center",
                fontSize: `${scale * 35}px`,
                lineHeight: "1",
                padding: "2px",
                
            }}>
                {ability}
            </button>
            <div style={{
                border: "2px solid grey",
                fontSize: `${scale * 50}px`,
                justifyContent: "center",
                lineHeight: "1",
                borderBottom: "2px solid grey",
                width: `${scale * 60}px`,
                textAlign: "center",
            }}>
                {abilityScore}
            </div>
            <div style={{
                width: `${scale * 35}px`,
                textAlign: "center",
                fontSize: `${scale * 20}px`,
                justifyContent: "center",
                border: "2px solid grey",
                lineHeight: "1",
                borderRadius: `${scale * 12}px`,
                paddingBottom: "2px"
            }}>
                {modText}
            </div>
        </div>
    )
}