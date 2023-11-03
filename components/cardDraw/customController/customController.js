import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CounterButton from "./counterButton";
import ValueDisplay from "../../generic/valueDisplay";
import { faD, faDice, faDiceFive, faDiceFour, faDiceOne, faDiceSix, faDiceThree, faDiceTwo } from "@fortawesome/free-solid-svg-icons";

export default function CustomController({currentVal, updateFunction, dieVal}) {

    let dieValue;
    switch(dieVal) {
        case 1:
            dieValue = faDiceOne
            break;
        case 2:
            dieValue = faDiceTwo
            break;
        case 3:
            dieValue = faDiceThree
            break;
        case 4:
            dieValue = faDiceFour
            break;
        case 5:
            dieValue = faDiceFive
            break;
        case 6:
            dieValue = faDiceSix
            break;
        default:
            dieValue = faDice;
    }

    return (
        <div className="controller">
            <CounterButton
                currentVal={currentVal}
                updateFunction={updateFunction}
                isUp={true}
                dieVal={dieVal}
                isDisabled={false}
            />
            <ValueDisplay valueToDisplay={currentVal}/>
            <CounterButton
                currentVal={currentVal}
                updateFunction={updateFunction}
                isUp={false}
                dieVal={dieVal}
                isDisabled={currentVal === 0}
            />
            <div style={{paddingTop: "10px"}}>
                <FontAwesomeIcon icon={dieValue} size="2xl"/>
            </div>
            
        </div>
    )

}