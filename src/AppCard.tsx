import React from 'react'

export type AppCardProps = {
    link: string
    favicon: string
    title: string
    subtitle: string
    onClick?: () => void
}

export const AppCard = ({
    link,
    favicon,
    title,
    subtitle,
    onClick,
}: AppCardProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick()
        window.open(link, '_blank', 'noopener,noreferrer')
    }
    return (
        <button
            type="button"
            className="card bg-secondary shadow-lg w-2/3 md:w-1/4 xl:w-1/6 flex flex-col items-start text-left cursor-pointer focus:outline-none"
            onClick={handleClick}
            tabIndex={0}
        >
            <img
                src={favicon}
                className="px-8 pt-6 w-32"
                alt={title + ' favicon'}
            />
            <div className="card-body h-40">
                <h2 className="card-title">{title}</h2>
                <p>{subtitle}</p>
            </div>
        </button>
    )
}
