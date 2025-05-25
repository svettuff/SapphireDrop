import { useState, useRef, useEffect } from 'react';

import teddy   from './assets/teddy.webp';
import gift    from './assets/gift.webp';
import flowers from './assets/flowers.webp';
import trophy  from './assets/trophy.webp';
import diamond from './assets/diamond.webp';
import hat     from './assets/hat.webp';
import star    from './assets/sticker.webp';
import giftBox from './assets/gift-colored.webp';

const rewards = [
    { img: teddy,   price: 15  },
    { img: gift,    price: 25  },
    { img: flowers, price: 50  },
    { img: trophy,  price: 100 },
    { img: diamond, price: 100 },
    { img: hat,     price: '650+' },
];

const randomReward = () => rewards[Math.floor(Math.random() * rewards.length)];

export default function SpinStandard() {
    const [strip, setStrip]       = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [showGift, setShowGift] = useState(true);
    const [winner, setWinner]     = useState(null);

    const reelRef = useRef(null);
    const maskRef = useRef(null);

    useEffect(() => {
        if (!spinning || strip.length === 0) return;

        const targetEl = reelRef.current.children[95];
        const maskEl   = maskRef.current;
        if (!targetEl || !maskEl) return;

        const targetRect = targetEl.getBoundingClientRect();
        const maskRect   = maskEl.getBoundingClientRect();

        const offset = (targetRect.left - maskRect.left)
            - (maskRect.width / 2 - targetRect.width / 2);

        requestAnimationFrame(() => {
            reelRef.current.style.transition = 'transform 4s cubic-bezier(.2,.8,.2,1)';
            reelRef.current.style.transform  = `translateX(-${offset}px)`;
        });

        const id = setTimeout(() => {
            reelRef.current.style.transition = 'none';
            reelRef.current.style.transform  = 'translateX(0)';
            setShowGift(true);
            setSpinning(false);
            setStrip([]);
            console.log('✅ Выпал:', winner);
        }, 4500);

        return () => clearTimeout(id);
    }, [spinning, strip, winner]);

    const startSpin = () => {
        if (spinning) return;

        const pick = randomReward();
        setWinner(pick);
        console.log('🎯 Должен выпасть:', pick);

        const arr = Array.from({ length: 100 }, () => randomReward());
        arr[95] = pick;

        setStrip(arr);
        setShowGift(false);
        setSpinning(true);
    };

    return (
        <div className="spin-container">
            <div className="spin-gift-block">
                {showGift ? (
                    <>
                        <img src={giftBox} alt="box" className="gift-img" />
                        <h1 className="label">Unlock Standard</h1>
                    </>
                ) : (
                    <div className="roller-mask" ref={maskRef}>
                        <div className="roller-strip" ref={reelRef}>
                            {strip.map((r, i) => (
                                <img key={i} src={r.img} alt="" className="roller-img" />
                            ))}
                        </div>
                        <div className="roller-indicator" />
                    </div>
                )}
            </div>

            <button className="spin-button" onClick={startSpin} disabled={spinning}>
                {spinning ? 'Spinning…' : 'Unlock for 30'}
                {!spinning && (
                    <img src={star} alt="star" className="star-icon-button" />
                )}
            </button>

            <div className="grid-rewards">
                {rewards.map((r, i) => (
                    <div key={i} className="reward-box">
                        <img src={r.img} alt="" className="reward-img" />
                        <div className="reward-price">
                            <img src={star} alt="" className="star-icon-reward" />{r.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
