import HeraldMarkdown from '@/components/generic/heraldMarkdown'
import MarkdownToc from '@/components/generic/markdownToc'

export default function Page() {
    
    return (
        <div className="wrapper">
            <MarkdownToc/>
            <HeraldMarkdown/>  
        </div>
    )
}