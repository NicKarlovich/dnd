"use client"
import { useEffect, useState } from 'react';
import { prefix } from "@/prefix";

export default function MarkdownToc() {

    const [headings, setHeadings] = useState([])
    const [tocOpen, setTocOpen] = useState(true)

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
            .map((elem, i) => ({
                id: elem.id,
                text: elem.innerText,
                level: Number(elem.nodeName.charAt(1)),
                idx: i,
            }))
        setHeadings(elements)
    }, [])

    const makeHeaderLink = (headerItem, hLevel, isSingleElement) => {
        let link = (
            <a 
                key={headerItem.idx}
                href={`#${headerItem.id}`}
                onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(`#${headerItem.id}`).scrollIntoView({
                        behavior: "smooth"
                    })
                }}
                >
                {headerItem.text}
            </a>
        )
        if (isSingleElement) {
            return (
                <li className={`tocnav head${hLevel}`} >{link}</li>
            )
        } else {
            return link
        }
    }

    /*
        An iterative recursive function that takes a list of headings, 
        and builds out sub headings (recursive part) while also 
        on the same level building out other headings at the same level (iterative part)

        So if you had 
        * Heading A
            * Heading B
            * Heading C
        * Heading D
        * Heading E
            * Heading F
                * Heading G
                * 
                * 
        the code would first take in the entire heading list
        then iteratively loop over the three headings Heading A, Heading D and Heading E
        each loop would call the recursive function recurseGetChildren but with only 
        the headers that lie between each top-level header,
        so Heading A would call recurseGetChildren([Heading B, Heading C])
            This new recursion would iterate over Heading B and C each of which would call
            recurseGetChildren([]) as they have no child elements and would return null
        Heading D woudl call recurseGetChildren([]) which will return null, but is still useful
        Heading E would call recurseGetChildren([Heading F, Heading G])
            which would then call recurseGetChildren([Heading G]) because heading G is a sub element 
            (ie it's level is less than Heading F)
                This would then cause Heading G to call recurseGetChildren([])
                which then bubbles back up to the top.

        Overall this returns an HTML tree of table of contents elements.
    */
    const recurseGetChildren = (headings) => {
        // base case, if headings is empty we have nothing to do here, this is a leaf node
        if(headings.length === 0) {
            return null
        }
        
        let output = []

        // get other headings of the same level
        let currentHeadingLevel = headings[0].level
        let headingsOfSameLevel = headings.filter((heading) => heading.level === currentHeadingLevel)

        //if there are other headings of the same level iterate over them, there must always be 1 to have gotten this far
        for(let i = 0; i < headingsOfSameLevel.length; i++) {

            let currentHeading = headingsOfSameLevel[i]
            let currentIdx = headings.findIndex((anyHeading) => currentHeading == anyHeading)

            // from the current header to the end of the list of headers available at this height
            // return all other remaining headers at this same level.
            let allRemainingHeadingsOfSameLevel = 
                headings.slice(currentIdx + 1) //all future values of array
                .filter((heading) => heading.level === currentHeadingLevel)
            
            let nextHeadingIdx = -1
            if(allRemainingHeadingsOfSameLevel.length === 0) {
                // there are no more elements of this tier
                // so we set ending splice index to the end of the list
                nextHeadingIdx = headings.length
            } else {
                // there are more headers of the same current level, so we only want to get the headers between those two
                // indicies as those are the headers that are children to the current header.
                nextHeadingIdx = headings.findIndex((anyHeading) => anyHeading === allRemainingHeadingsOfSameLevel[0])
            }
        
            // now we will attempt to get any children headers that are nested underneath this current header
            let children = recurseGetChildren(headings.slice(currentIdx + 1, nextHeadingIdx))

            //if there are no children
            if(children === null) { 
                // then we just push out the current header as a non-collapsable element, as it is a leaf node
                output.push(makeHeaderLink(currentHeading, currentHeading.level, true))

            //if there are children
            } else {
                // then we push out the current header as a collapsable element with the children 
                // that were built up before by recursive call
                output.push(
                    <details>
                        <summary className={`tocnav head${currentHeading.level}`}>
                            {makeHeaderLink(currentHeading, currentHeading.level, false)}
                        </summary>
                        {children}
                    </details>
                )
            }
        }

        // once we exit the iterative loop for all the headers at this current level.
        if(output.length === 0) {
            // if this is a leaf node itself, ie there are no children, then we make a the header as a leaf node element.
            // this code might never be reached.

            // yeah, thinking about this more, we must enter the for-loop above because
            // we passed the base case check above.
            // and once you enter the for-loop you're guranateed to push SOMETHING
            // into the output array, thus this will never === 0.
            return makeHeaderLink(headings[0], headings[0].level, true)
        } else {
            // given the headers as input, we will now output
            // all the top level headers as html along with their recrusively generated children (as HTML)
            return (
                <>
                    {output.map((subHeading) => subHeading)}
                </>
            )
        }
    }

    // initial call to begin building ToC
    let topLevelOutput = recurseGetChildren(headings)

    let navId = tocOpen ? "navBody" : "closedNavBody"

    return (
        <nav id={navId} className="tocnav">
            {tocOpen &&
                <ul className="tocnav">
                    {topLevelOutput}
                </ul>
            }
            <button
                className='tocOpenCloseButton'
                onClick={() => {
                    console.log('toggle state')
                    setTocOpen(!tocOpen)
                }}
            >
                <img
                    style={{
                        "rotate": tocOpen ? "180deg" : "0deg"
                    }}
                    className="tocOpenCloseIcon" src={`${prefix}/chevron.png`} alt="open/close sidebar chevron"
                />
            </button>
        </nav>
    )
}