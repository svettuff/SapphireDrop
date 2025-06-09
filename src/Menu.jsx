import { useEffect, useState } from 'react';

import gift1 from './assets/gift-colored.webp'
import gift2 from './assets/gift-gold.webp'

import calendarGif from './gifs/calendar.gif';
import candyGif    from './gifs/candy.gif';
import hattGif     from './gifs/hatt.gif';
import drinkGif    from './gifs/drink.gif';
import eyeGif      from './gifs/eye.gif';
import roseGif     from './gifs/rose.gif';

import teddyGif    from './gifs/teddy.gif';
import giftGif     from './gifs/gift.gif';
import flowersGif  from './gifs/flowers.gif';
import trophyGif   from './gifs/trophy.gif';
import diamondGif  from './gifs/diamond.gif';
import hatGif      from './gifs/hat.gif';

import ton from "./assets/ton.webp";

const rewardGifs = {
    calendar: calendarGif,
    candy:    candyGif,
    hatt:     hattGif,
    drink:    drinkGif,
    eye:      eyeGif,
    rose:     roseGif,
    teddy:    teddyGif,
    gift:     giftGif,
    flowers:  flowersGif,
    trophy:   trophyGif,
    diamond:  diamondGif,
    hat:      hatGif,
};

function Balance() {
    const [tons, setTons] = useState(0);

    return (
        <div className="balance-block">
            <div className="balance-price">
                <img src={ton} alt="TON" className="balance-ton-icon" />
                <span className="balance-count">{tons}</span>
            </div>

            <button
                className="balance-plus-button"
                onClick={() => setTons((p) => p + 1)}
            >
            </button>
        </div>
    );
}

function RecentGiftsStrip() {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        fetch('https://sapphiredrop.ansbackend.ch/latest-gifts')
            .then(r => r.json())
            .then(data => setLatest(data.rewards || []))
            .catch(console.error);
    }, []);

    if (!latest.length) return null;

    const reversed = [...latest].reverse();

    return (
        <div className="recent-strip-container">
            <div className="recent-strip-header">
                Latest Drops
            </div>
            <div className="recent-strip">
                {reversed.map((key, i) => (
                    <div className="strip-item" key={`${key}-${i}`}>
                        <img src={rewardGifs[key]} alt={key} className="strip-img" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function Menu({ onStandard, onUniqueCollectible }) {
    return (
        <div className="container">

            <RecentGiftsStrip />
            <Balance />

            <div className="gift-block" onClick={onStandard}>
                <img src={gift1} alt="Gift" className="gift-img" />
                <div className="gift-label-container">
                    <h1 className="label">Unlock Standard</h1>
                    <div className="gift-price">
                        <img src={ton} alt="" className="gift-price-ton-icon" />0.15
                    </div>
                </div>
            </div>

            <div className="gift-block" onClick={onUniqueCollectible}>
                <img src={gift2} alt="Gold gift" className="gift-img" />
                <div className="gift-label-container">
                    <h1 className="label">Unlock Collectible</h1>
                    <div className="gift-price">
                        <img src={ton} alt="" className="gift-price-ton-icon" />2.5
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu