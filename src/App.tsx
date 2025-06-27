import { useEffect, useState } from 'react'
import DVDLogoAnimation from 'react-dvd-player-animation'
import { useKonami } from 'react-konami-code'
import { AppCard, AppCardProps } from './AppCard'

const HEIGHT = 400
const WIDTH = 300

const links: AppCardProps[] = [
    {
        link: 'https://blog.liorp.dev/',
        favicon: '/favicon_blog.png',
        title: 'Blog',
        subtitle: 'Writing stuff',
    },
    {
        link: 'https://milan.liorp.dev/',
        favicon: '/favicon_milan.png',
        title: 'Milan',
        subtitle: 'Like wordle, but in Hebrew',
    },
    {
        link: 'https://hzi.liorp.dev/',
        favicon: '/favicon_hzi.png',
        title: 'HZI',
        subtitle: 'Cheaper electricity for your home',
    },
    {
        link: 'https://fireplace.liorp.dev/',
        favicon: '/favicon_fireplace.png',
        title: 'Fireplace',
        subtitle: 'See where you can retire right now 🍹',
    },
    {
        link: 'https://cmprsr.liorp.dev/',
        favicon: '/favicon_cmprsr.png',
        title: 'CMPRSR',
        subtitle: 'Compression 101',
    },
    {
        link: '#',
        favicon: '/favicon_analytics.png',
        title: 'Analytics',
        subtitle: 'Set your analytics preferences',
        onClick: () => klaro.show(undefined, true),
    },
]

const App = () => {
    const [showDvdPlayer, setShowDvdPlayer] = useState(false)
    useKonami(() => setShowDvdPlayer((v) => !v))

    useEffect(() => {
        try {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div>
            <header className="flex flex-col items-center">
                <h1 className="m-auto mb-1 min-h-fit leading-loose w-max bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-gradient text-4xl font-bold transition transform hover:-rotate-6">
                    Lior
                </h1>
                <img
                    style={{
                        borderRadius: '50%',
                        borderWidth: '5px',
                        borderColor: 'black',
                        marginBottom: '1rem',
                    }}
                    className="shadow-lg"
                    src="profile.webp"
                    width="200"
                    height="200"
                    alt="Me"
                />
            </header>
            <main>
                <div>
                    <span className="block max-w-lg m-auto p-2">
                        Hey there! I'm a creative R&D enthusiast with a knack
                        for Python and TypeScript magic, system upgrades, and
                        steering projects like a champ. I love diving into the
                        world of microservices and playing my part in open
                        source projects. Whether it's optimizing systems,
                        leading projects, or crafting top-notch applications,
                        I'm all in! ✨
                    </span>
                </div>
                <div className="flex flex-wrap rounded-box p-4 gap-8 lg:gap-10 xl:gap-18 w-full justify-center md:justify-start">
                    {links.map((link) => (
                        <AppCard key={link.title} {...link} />
                    ))}
                </div>
                {/* <ins
                    className="adsbygoogle w-1/4 xl:w-1/6 mx-auto"
                    style={{
                        display: 'block',
                    }}
                    data-ad-client="ca-pub-4529248472834919"
                    data-ad-slot="6061011972"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins> */}
                {showDvdPlayer && (
                    <div className="monitor-container">
                        <div className="monitor">
                            <div
                                className="monitor-screen"
                                style={{ height: HEIGHT, width: WIDTH }}
                            >
                                <DVDLogoAnimation
                                    height={HEIGHT}
                                    width={WIDTH}
                                    logoHeight={40}
                                    logoWidth={90}
                                >
                                    <g
                                        id="svgGroup"
                                        strokeLinecap="round"
                                        fillRule="evenodd"
                                        fontSize="9pt"
                                    >
                                        <path
                                            d="M 8.55 4.95 L 8.55 33.45 L 19.75 33.45 L 19.75 40.05 L 0 40.05 L 0 4.95 L 8.55 4.95 Z M 87.75 11.85 L 87.75 20.9 L 85.4 20.9 A 11.902 11.902 0 0 0 83.641 21.021 Q 82.743 21.156 82.019 21.44 A 4.895 4.895 0 0 0 80.6 22.275 A 3.954 3.954 0 0 0 79.537 23.8 Q 79 25.102 79 27.1 L 79 40.05 L 70.45 40.05 L 70.45 12.15 L 79 12.15 L 79 16.8 Q 80.5 14.5 82.75 13.175 A 9.661 9.661 0 0 1 87.707 11.85 A 11.401 11.401 0 0 1 87.75 11.85 Z M 46.75 39.841 A 16.494 16.494 0 0 0 51.3 40.45 A 18.409 18.409 0 0 0 52.562 40.408 A 15.334 15.334 0 0 0 58.725 38.7 Q 62.05 36.95 63.975 33.675 A 13.461 13.461 0 0 0 65.388 30.262 A 16.301 16.301 0 0 0 65.9 26.1 A 17.784 17.784 0 0 0 65.766 23.888 A 14.046 14.046 0 0 0 64 18.525 Q 62.1 15.25 58.8 13.5 A 14.537 14.537 0 0 0 55.987 12.367 A 16.574 16.574 0 0 0 51.4 11.75 A 18.305 18.305 0 0 0 50.014 11.802 A 15.134 15.134 0 0 0 44 13.5 Q 40.7 15.25 38.8 18.525 Q 36.9 21.8 36.9 26.1 A 18.035 18.035 0 0 0 37.083 28.712 A 13.909 13.909 0 0 0 38.775 33.7 Q 40.65 36.95 43.925 38.7 A 14.327 14.327 0 0 0 46.75 39.841 Z M 23.85 12.15 L 32.4 12.15 L 32.4 40.05 L 23.85 40.05 L 23.85 12.15 Z M 51.3 33.05 A 5.551 5.551 0 0 0 55.366 31.361 A 6.924 6.924 0 0 0 55.475 31.25 A 5.83 5.83 0 0 0 56.84 28.839 Q 57.11 27.933 57.177 26.846 A 12.024 12.024 0 0 0 57.2 26.1 A 10.737 10.737 0 0 0 57.024 24.091 Q 56.657 22.167 55.525 20.95 A 5.508 5.508 0 0 0 53.263 19.447 A 5.711 5.711 0 0 0 51.4 19.15 A 5.758 5.758 0 0 0 49.113 19.594 A 5.467 5.467 0 0 0 47.25 20.925 A 5.684 5.684 0 0 0 46.016 23.096 Q 45.736 23.968 45.645 25.024 A 12.455 12.455 0 0 0 45.6 26.1 A 11.088 11.088 0 0 0 45.767 28.087 Q 46.121 30.027 47.225 31.25 A 5.229 5.229 0 0 0 50.997 33.043 A 6.467 6.467 0 0 0 51.3 33.05 Z M 26.462 9.033 A 6.236 6.236 0 0 0 28.15 9.25 A 6.642 6.642 0 0 0 28.95 9.203 A 4.901 4.901 0 0 0 31.775 7.925 A 5.188 5.188 0 0 0 31.905 7.8 A 4.279 4.279 0 0 0 33.2 4.65 A 5.484 5.484 0 0 0 33.197 4.464 A 4.325 4.325 0 0 0 31.775 1.325 Q 30.35 0 28.15 0 A 6.751 6.751 0 0 0 27.133 0.074 A 4.883 4.883 0 0 0 24.475 1.325 Q 23.05 2.65 23.05 4.65 A 5.22 5.22 0 0 0 23.053 4.832 A 4.277 4.277 0 0 0 24.475 7.925 A 4.76 4.76 0 0 0 26.462 9.033 Z"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </g>
                                </DVDLogoAnimation>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
