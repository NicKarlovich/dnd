import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function PlusMinusButton({isUp, onClick, isDisabled = false}) {
    return (
        <>
            <button disabled={isDisabled} className="counterButton" onClick={onClick}>
                {isUp ? <FontAwesomeIcon icon={faCirclePlus} /> : <FontAwesomeIcon icon={faCircleMinus} />}
            </button>
        </>
    )
}