import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { CoinDetails } from "./pages/CoinDetails"

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/markets/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
