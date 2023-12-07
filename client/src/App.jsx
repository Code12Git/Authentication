import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgetPassword from "./pages/ForgetPassword"
import { Routes,Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Fragment } from "react"
import { Navigate } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
function App() {

  return (
    <Fragment>
      <Toaster />
    <Routes>
              <Route path="/" element={<Navigate to="/register" />} />

       <Route exact path="/register" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
    </Fragment>
  )
}

export default App
