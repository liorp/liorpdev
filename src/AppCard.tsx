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
    return (
        <div className="card bg-secondary shadow-lg w-[95%] md:w-100 flex flex-col items-start">
            <a href={link} onClick={onClick}>
                <img src={favicon} className="px-8 pt-6 w-32" />
                <div className="card-body h-40">
                    <h2 className="card-title">{title}</h2>
                    <p>{subtitle}</p>
                </div>
            </a>
        </div>
    )
}
