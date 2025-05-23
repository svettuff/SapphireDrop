import { useState } from 'react'

import Menu from './Menu'
import SpinStandard from './SpinStandard'
import SpinCustom from './SpinCustom'

import './App.css'

function App() {
    const [screen, setScreen] = useState('menu')

    return (
        <>
            {screen === 'menu' && (
                <Menu
                    onStandard={() => setScreen('spinStandard')}
                    //onCustom={() => setScreen('spinCustom')}
                />
            )}
            {screen === 'spinStandard' && <SpinStandard />}
            {screen === 'spinCustom' && <SpinCustom />}
        </>
    )
}

export default App
