import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remark } from 'remark'
import {read} from 'to-vfile'
import removeComments from 'remark-remove-comments';
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import remarkSlug from 'remark-slug'

const HeraldText = String(await remark()
	.use(removeComments)
	.use(remarkToc)
	.use(remarkSlug)
    .use(remarkGfm)
	.process(await read('@/../data/herald.md'))
)


export default function HeraldMarkdown() {

    
    return <>
        <div
            className="markdown" 
            style={{
                margin: "0 auto",
                marginLeft: "10px",
                marginTop: "5px",
            }}
            id="markdownContainer"
        >
            <div className="spoiler">
                <h5 >SPOILERS FOR STORMLIGHT ARCHIVE THROUGH BOOK 4: RHYTHM OF WAR</h5>
                <i>Personally, I'd highly suggest reading the books if you have the time, they're amazing, but if you don't plan on reading the books, or don't care about spoilers then read on!</i>
            </div>
            <Markdown 
				remarkPlugins={[remarkGfm]} 
				rehypePlugins={[rehypeSlug]}
			>
				{HeraldText}
			</Markdown>
        </div>
    </>
}