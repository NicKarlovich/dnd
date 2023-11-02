export default function ValueDisplay({valueToDisplay}) {
    return (
        <>
            <p style={{
                fontSize: '20px',
                minWidth: '36px',
                }}
            >
                {valueToDisplay}
            </p>
        </>
    )
}