import Image from "next/image";

export const Preloader = () => {
    return (
        <div className={`fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] 
                        flex justify-center items-center
                        w-[150px] h-[150px]
                        rounded-full overflow-hidden bg-white`}>
            <Image
                src="/preloader.gif"
                alt="Loading..."
                className="dark:invert"
                width={200}
                height={200}
                priority
            />
        </div>
    )
}
