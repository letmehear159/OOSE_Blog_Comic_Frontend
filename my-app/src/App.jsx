import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                        Tailwind CSS Test
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        If you see a blue title and a styled button, Tailwind is working!
                    </p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Test Button
                    </button>
                    <div className="mt-4">
                        <span className="text-red-500 font-semibold">Red Text</span>
                        <span className="text-yellow-500 font-semibold ml-2">Yellow Text</span>
                        <span className="text-purple-500 font-semibold ml-2">Purple Text</span>
                    </div>
                    <div className="mt-4">
                        <div
                            className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mx-auto"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
