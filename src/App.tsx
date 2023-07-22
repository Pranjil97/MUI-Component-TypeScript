import './App.css'
import { Routes, Route } from 'react-router-dom'
import FirstPage from './components/FirstPage'
import SecondPage from './components/SecondPage'

function App() {
  return (
    <div className='App flex flex-col h-full w-full justify-center items-center'>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/second-page' element={<SecondPage />} />
      </Routes>
    </div>
  )
}

export default App
