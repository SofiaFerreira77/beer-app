export default function Heading({ title, subtitle }) {
    return (
        <>
            <h1 className="text-center text-2xl mt-10">{title}</h1>
            <h2 className="text-center text-md mb-10">{subtitle}</h2>
        </>
    )
}
