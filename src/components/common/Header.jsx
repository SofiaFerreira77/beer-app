import Link from "next/link";

export default function Header(props) {
    return (
        <header className="fixed top-0 z-20 w-full h-22 bg-gray py-6">
            <nav className="w-full flex justify-center" aria-label="Global">
                <Link href="/"
                    className={`-m-1.5 p-1.5 text-2xl text-white_2
                                transition-all hover:text-white`}>
                    {props.title}
                </Link>
            </nav>
        </header>
    )
}