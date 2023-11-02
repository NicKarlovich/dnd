import ValueDisplay from "../generic/valueDisplay"
import PlusMinusButton from "../generic/plusMinusButton"

export default function AbilityScoreDisplay({abilityScore, abilityScoreText, handleIncrease, handleDecrease, maxAbilityScore, minAbilityScore }) {

    return (
        <div className="controller"
            style={{
                display: "flex", 
                flexDirection: "column", 
                textAlign: "center", 
                alignItems: "center",
            }}
        >
            {abilityScoreText}
            <PlusMinusButton
                onClick={() => handleIncrease(abilityScoreText)}
                isUp={true}
                isDisabled={abilityScore >= maxAbilityScore}
            >
                up
            </PlusMinusButton>
            <ValueDisplay valueToDisplay={abilityScore} />
            <PlusMinusButton 
                isUp={false}
                disabled={abilityScore <= minAbilityScore}
                onClick={() => handleDecrease(abilityScoreText)}
            >
                down
            </PlusMinusButton>
        </div>
    )
}