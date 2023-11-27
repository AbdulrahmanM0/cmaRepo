import FormPage from "./Pages/FormPage"
import Submited from "./Pages/FormPage/Submited"
import "./assets/style/custom.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap/dist/css/bootstrap.css"
import { Route , Routes } from "react-router-dom"


function App() {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/complete" element={<Submited />} />
    </Routes>
  )
}

export default App
