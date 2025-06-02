import {useCallback, useState} from 'react'

import Menu from './Menu'
import SpinStandard from './SpinStandard'
import SpinUniqueCollectible from './SpinUniqueCollectible.jsx'

import './App.css'

function App() {
    const [screen, setScreen] = useState('menu')
    const goMenu = useCallback(() => setScreen('menu'), []);

    return (
        <>
            {screen === 'menu' && (
                <Menu
                    onStandard={() => setScreen('spinStandard')}
                    onUniqueCollectible={() => setScreen('spinUniqueCollectible')}
                />
            )}

            {screen === 'spinStandard' && (
                <SpinStandard onBack={goMenu} />
                )}

            {screen === 'spinUniqueCollectible' && (
                <SpinUniqueCollectible onBack={goMenu} />
            )}
        </>
    );
}

export default App
