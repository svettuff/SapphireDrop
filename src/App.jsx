import './App.css'
import gift1 from './assets/gift-colored.webp'
import gift2 from './assets/gift-gray.webp'

function App() {
    return (
        <div className="container">
            <div className="gift-block">
                <img src={gift1} alt="Colored gift" className="gift-img" />
                <h1 className="label">Standard</h1>
            </div>
            <div className="gift-block">
                <img src={gift2} alt="Gray gift" className="gift-img" />
                <h1 className="label">Make Custom</h1>
            </div>
        </div>
    )
}

export default App
