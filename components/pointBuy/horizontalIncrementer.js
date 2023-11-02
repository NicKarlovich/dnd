import PlusMinusButton from "../generic/plusMinusButton";
import ValueDisplay from "../generic/valueDisplay";

export default function HorizontalIncrementer({
    currentVal, 
    upFunction, 
    downFunction, 
    horizontalLabel = null, 
    redGreenGradientValue = false,
}) {

    function convertValueToRedGreenGradient(value) {
        const SCALE = 30
        let rgb;
        if (value === 0) {
            rgb = `rgb(255, 255, 255)`
        }
        else if(value < 0) { //make it green
            let redBlue = 205 + (SCALE * value)
            if (redBlue > 255) {
                redBlue = 255
            }
            rgb = `rgb(${redBlue},255,${redBlue})`
        } else {
            let greenBlue = 205 - (SCALE * value)
            if (greenBlue > 255) {
                greenBlue = 255
            }
            rgb = `rgb(255,${greenBlue},${greenBlue})`
        }
        return rgb
        
    }
    let textColor = redGreenGradientValue ? convertValueToRedGreenGradient(currentVal) : "white"

    return (
        <>
            {horizontalLabel !== null && (
                <div className="controller"
                    style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "padding": "5px",
                        "alignItems": "center",
                        "width": "159px",
                    }}
                >
                    <div style={{
                        minWidth: "36px",
                        fontWeight: "bolder",
                        textDecorationLine: "underline",
                        textUnderlineOffset: 5,
                    }}>
                        {horizontalLabel}
                    </div>
                    <div className="controller"
                        style={{
                            "display": "flex",
                            "flexDirection": "row",
                            "padding": "5px",
                            "alignItems": "center",
                            "width": "150px",
                        }}
                    >
                        <PlusMinusButton
                            onClick={downFunction}
                            isUp={false}
                        />
                        <span style={{"color": textColor}}>
                            <ValueDisplay valueToDisplay={currentVal}/>
                        </span>
                        <PlusMinusButton
                            onClick={upFunction}
                            isUp={true}
                        />
                    </div>
                </div>
            )}
            { horizontalLabel === null && (
                <div className="controller"
                style={{
                    "display": "flex",
                    "flexDirection": "row",
                    "padding": "5px",
                    "alignItems": "center",
                    "width": "150px",
                }}
            >
                    <PlusMinusButton
                        onClick={downFunction}
                        isUp={false}
                    />
                    <ValueDisplay valueToDisplay={currentVal}/>
                    <PlusMinusButton
                        onClick={upFunction}
                        isUp={true}
                    />
                </div>
            )
            }
        </>
    )
}