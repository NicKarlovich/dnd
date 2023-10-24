import { useState } from "react";

export default function SortButtons({setViewWidth}) {

    const [windowWidth, setWindowWidth] = useState(100000)

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
    });

    return (
        <div style={{
            display: "flex",
        }}>
            <button className="organizeIconButton" onClick={() => setViewWidth(705)}>
                <img className="organizeIcon" src={'/flexDownLarge.png'} alt="flex down icon" />
            </button>
            {windowWidth > 706 && 
            <button className="organizeIconButton" onClick={() => setViewWidth(708)}>
                <img className="organizeIcon" src={'/twoWideThreeTallLarge.png'} alt="two wide three tall icon" />
            </button>
            }
            {windowWidth > 1068 &&
            <button className="organizeIconButton"onClick={() => setViewWidth(1068)}>
                <img className="organizeIcon" src={'/threeWideTwoTallLarge.png'} alt="three wide two tall icon" />
            </button>
            }
            {windowWidth > 1415 &&
            <button className="organizeIconButton"onClick={() => setViewWidth(100000)}>
                <img className="organizeIcon" src={'/flexRightLarge.png'} alt="flex right icon" />
            </button>
            }
        </div>
    )
}