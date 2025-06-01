import gift1 from './assets/gift-colored.webp'
import gift2 from './assets/gift-gray.webp'

function Menu({ onStandard, onUniqueCollectible }) {
    return (
        <div className="container">
            <div className="gift-block" onClick={onStandard}>
                <img src={gift1} alt="Colored gift" className="gift-img" />
                <h1 className="label">Unlock Standard</h1>
            </div>
            <div className="gift-block" onClick={onUniqueCollectible}>
                <img src={gift2} alt="Gray gift" className="gift-img" />
                <h1 className="label">Unlock Unique Collectible</h1>
            </div>
        </div>
    )
}

export default Menu