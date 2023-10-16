import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CounterButton({currentVal, isUp, updateFunction}) {

    const MAX = 18
    const MIN = 0

    let func = () => {
        console.log('before', currentVal)
        if (isUp && currentVal < 18) {
            updateFunction(currentVal + 1)
        } if(!isUp && currentVal > 0) {
            updateFunction(currentVal - 1)
        }
        
    }

    return (
        <>
            <button className="counterButton" onClick={func}>
                {isUp ? <FontAwesomeIcon icon={faCirclePlus} /> : <FontAwesomeIcon icon={faCircleMinus} />}
            </button>
        </>
    )

}