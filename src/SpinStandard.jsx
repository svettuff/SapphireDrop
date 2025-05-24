import teddy from './assets/teddy.webp';
import gift from './assets/gift.webp';
import flowers from './assets/flowers.webp';
import trophy from './assets/trophy.webp';
import diamond from './assets/diamond.webp';
import hat from './assets/hat.webp';
import star from './assets/star.webp';

import giftAsset from './assets/gift-colored.webp'

const rewards = [
    { img: teddy, price: 15 },
    { img: gift, price: 25 },
    { img: flowers, price: 50 },
    { img: trophy, price: 100 },
    { img: diamond, price: 100 },
    { img: hat, price: '650+' },
];

function SpinStandard() {
    return (
        <div className="spin-container">
            <div className="spin-gift-block">
                <img src={giftAsset} alt="Spin gift" className="gift-img" />
                <h1 className="label">Unlock Standard</h1>
            </div>

            <button className="spin-button">
                Unlock for 30
                <img src={star} alt="star" className="star-icon-button" />
            </button>

            <div className="grid-rewards">
                {rewards.map((reward, i) => (
                    <div key={i} className="reward-box">
                        <img src={reward.img} alt={`reward-${i}`} className="reward-img" />
                        <div className="reward-price">
                            <img src={star} alt="star" className="star-icon-reward" />
                            {reward.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpinStandard;
