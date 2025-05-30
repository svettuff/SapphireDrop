import gift1 from './assets/gift-colored.webp'
import gift2 from './assets/gift-gray.webp'

function Menu({ onStandard, onCustom }) {
    return (
        <div className="container">
            <div className="gift-block" onClick={onStandard}>
                <img src={gift1} alt="Colored gift" className="gift-img" />
                <h1 className="label">Unlock Standard</h1>
            </div>
            <div className="gift-block" onClick={onCustom}>
                <img src={gift2} alt="Gray gift" className="gift-img" />
                <h1 className="label">Upcoming Soon...</h1>
            </div>
        </div>
    )
}

export default Menu