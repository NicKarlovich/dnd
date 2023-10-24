import PlusMinusButton from "@/components/generic/plusMinusButton"
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CounterButton({currentVal, isUp, updateFunction}) {

    const MAX = 18
    const MIN = 0

    let func = () => {
        if (isUp && currentVal < 18) {
            updateFunction(currentVal + 1)
        } if(!isUp && currentVal > 0) {
            updateFunction(currentVal - 1)
        }
        
    }

    return (
        <PlusMinusButton onClick={func} isUp={isUp} />
    )

}