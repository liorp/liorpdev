const App = () => (
    <div>
        <header>
            <h1 className="m-auto mb-1 min-h-fit leading-loose w-max bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-gradient text-4xl font-bold transition transform hover:-rotate-6">
                Lior
            </h1>
        </header>
        <main>
            <div className="flex justify-center align-center">
                <div className="card text-center shadow-2xl m-10 h-min">
                    <figure className="px-10 pt-10">
                        <img
                            src="/favicon_milan.png"
                            className="rounded-xl max-w-[10rem]"
                        />
                    </figure>
                    <div className="card-body flex-grow-0">
                        <h2 className="card-title">Milan</h2>
                        <p>Like wordle, but in Hebrew.</p>
                        <div className="justify-center card-actions">
                            <a href="https://blog.liorp.dev/">
                                <button className="btn btn-outline btn-accent hover-animation">
                                    Yis
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card text-center shadow-2xl m-10  h-min">
                    <figure className="px-10 pt-10">
                        <img
                            src="/favicon_blog.png"
                            className="rounded-xl max-w-[10rem]"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Milan</h2>
                        <p>Like wordle, but in Hebrew.</p>
                        <div className="justify-center card-actions">
                            <a href="https://milan.liorp.dev/">
                                <button className="btn btn-outline btn-accent hover-animation">
                                    Yis
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
)

export default App
