import gift2 from './assets/gift-gray.webp'

function SpinCustom() {
    return (
        <div className="container">
            <div className="gift-block caution">
                <img src={gift2} alt="Custom spin" className="gift-img" />
                <h1 className="label">Opening Custom...</h1>
            </div>
        </div>
    )
}

export default SpinCustom
