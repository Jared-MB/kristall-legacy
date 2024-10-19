export default function Step ({ index, title, children }: { index: number, title: string, children?: React.ReactNode }) {
    return (
        <article className='flex items-center flex-col gap-8'>
            <div className='flex flex-col items-center gap-4'>
                <span className='text-purple-500 text-9xl font-light'>{index}</span>
                <h3 className='text-4xl text-center'>{title}</h3>
            </div>
            <p className='text-center text-zinc-400'>{children}</p>
        </article>
    )
}