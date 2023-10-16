import shuffle from 'just-shuffle';

export default function useCardDraw() {
    
    const originalDeployment = [6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2]
    const upgraded =           [6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1]
    
    const originalDeploymentDescription = "3x6, 4x5/4/3, 3x2, total 72"
    const upgradedDescription = "4x6/5, 3x4, 4x3, 2x2, 1x1, total 74"

    // arrOfValues must be exactly 18 elements 
    const doCardDraw = (arrOfValues) => {
        let shuffledStats = shuffle(arrOfValues)
        return [
            shuffledStats.slice(0, 3),
            shuffledStats.slice(3, 6),
            shuffledStats.slice(6, 9),
            shuffledStats.slice(9, 12),
            shuffledStats.slice(12, 15),
            shuffledStats.slice(15, 18),
        ]
    }

    return {
        upgraded,
        originalDeployment,
        doCardDraw
    }
}