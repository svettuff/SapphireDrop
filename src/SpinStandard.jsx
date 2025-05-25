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
    { type: 'teddy',   img: teddy,   price: 15   },
    { type: 'gift',    img: gift,    price: 25   },
    { type: 'flowers', img: flowers, price: 50   },
    { type: 'trophy',  img: trophy,  price: 100  },
    { type: 'diamond', img: diamond, price: 100  },
    { type: 'hat',     img: hat,     price: '650+' },
];

const randomReward = () => rewards[Math.floor(Math.random() * rewards.length)];

export default function SpinStandard() {
    const [strip, setStrip]       = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [showGift, setShowGift] = useState(true);
    const [showModal, setShowModal]   = useState(false);
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
            setSpinning(false);
            reelRef.current.style.transition = 'none';
            reelRef.current.style.transform  = 'translateX(0)';
            setShowGift(true);
            setStrip([]);
            setShowModal(true);
            console.log('✅ Выпал:', winner);
        }, 4500);

        return () => clearTimeout(id);
    }, [spinning, strip, winner]);

    const startSpin = async () => {
        if (spinning) return;

        try {
            const inv = await fetch('https://sapphiredrop.ansbackend.ch/generate-invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const { invoiceLink, payload } = await inv.json();
            if (!invoiceLink || !payload) throw new Error('Cant create invoice');

            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.openInvoice(invoiceLink);

                window.Telegram.WebApp.onEvent('invoiceClosed', async () => {
                    try {
                        const giftRes = await fetch(
                            `https://sapphiredrop.ansbackend.ch/get-gift?payload=${payload}`
                        );
                        const { reward } = await giftRes.json();

                        if (!reward) throw new Error('Reward not found');

                        const pick = rewards.find(r => r.type === reward);
                        if (!pick) throw new Error(`Unknown reward: ${reward}`);

                        setWinner(pick);
                        const arr = Array.from({ length: 100 }, () => randomReward());
                        arr[95] = pick;

                        setStrip(arr);
                        setShowGift(false);
                        setSpinning(true);
                    } catch (err) {
                        console.error('Gift error:', err);
                        alert(err.message || 'Reward error');
                        setSpinning(false);
                    }
                });
            } else {
                window.open(invoiceLink, '_blank');
            }
        } catch (err) {
            console.error('Invoice error:', err);
            alert(err.message || 'Spin error');
            setSpinning(false);
        }
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setWinner(null);
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

            {showModal && winner && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Congratulations!</h2>
                        <img src={winner.img} alt={winner.type} className="modal-img" />
                        <p className="modal-text">Your gift has been sent to you</p>
                        <button onClick={handleCloseModal} className="try-again-btn">
                            Try again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
