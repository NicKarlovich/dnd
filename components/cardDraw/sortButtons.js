import { prefix } from "@/prefix";
import { useState } from "react";

export default function SortButtons({setViewWidth, isWider = false, componentWidth}) {

    const [windowWidth, setWindowWidth] = useState(100000)

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
    });

    return (
        <div style={{
            display: "flex",
        }}>
            <button className="organizeIconButton" onClick={() => setViewWidth(componentWidth * 2 + 5)}>
                <img className="organizeIcon" src={`${prefix}/flexDownLarge.png`} alt="flex down icon" />
            </button>
            {windowWidth > componentWidth * 2 + 6 && 
            <button className="organizeIconButton" onClick={() => setViewWidth(componentWidth * 2 + 8)}>
                <img className="organizeIcon" src={`${prefix}/twoWideThreeTallLarge.png`} alt="two wide three tall icon" />
            </button>
            }
            {windowWidth > componentWidth * 3 + 13 &&
            <button className="organizeIconButton"onClick={() => setViewWidth(componentWidth * 3 + 13)}>
                <img className="organizeIcon" src={`${prefix}/threeWideTwoTallLarge.png`} alt="three wide two tall icon" />
            </button>
            }
            {windowWidth > componentWidth * 4 + 15 &&
            <button className="organizeIconButton"onClick={() => setViewWidth(100000)}>
                <img className="organizeIcon" src={`${prefix}/flexRightLarge.png`} alt="flex right icon" />
            </button>
            }
        </div>
    )
}