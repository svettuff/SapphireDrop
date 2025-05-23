import gift1 from './assets/gift-colored.webp'

function SpinStandard() {
    return (
        <div className="spin-container">
            <div className="spin-gift-block">
                <img src={gift1} alt="Standard spin" className="gift-img" />
                <h1 className="label">Unlock Standard</h1>
            </div>

            <button className="spin-button">Unlock for 30</button>

            <div className="grid-rewards">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="grid-box">?</div>
                ))}
            </div>
        </div>
    )
}

export default SpinStandard
