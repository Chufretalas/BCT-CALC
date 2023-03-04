export default function GreenButton({ children }: {children: React.ReactNode}) {
    return (
        <div
            className="p-4 bg-custom-green-light text-custom-yellow font-bold rounded-full text-xl drop-shadow-lg
                             hover:bg-custom-green-dark active:scale-90 duration-75">
            {children}
        </div>
    )
}