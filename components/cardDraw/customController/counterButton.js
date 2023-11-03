import PlusMinusButton from "@/components/generic/plusMinusButton"

export default function CounterButton({currentVal, isUp, updateFunction, dieVal, isDisabled}) {

    const MAX = 18
    const MIN = 0

    let func = () => {
        if (isUp && currentVal < 18) {
            updateFunction(dieVal, + 1)
        } if(!isUp && currentVal > 0) {
            updateFunction(dieVal, - 1)
        }
    }

    return (
        <PlusMinusButton onClick={func} isUp={isUp} isDisabled={isDisabled}/>
    )

}