import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { Shop } from "./pages/Shop"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Contact } from "./pages/Contact"
import { Navbar } from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import { UserLayout } from "./components/layouts/UserLayout"
import { Profile } from "./pages/user/Profile"
import { Book } from "./pages/Book"
import { Cart } from "./pages/user/Cart"
import { Order } from "./pages/user/Order"
import { ShowOrders } from "./pages/user/ShowOrders"
import { Footer } from "./components/Footer"
import { ScrollToTop } from "./components/ScrollToTop"
import { Error } from "./components/Error"
import { OtpVerify } from "./components/OtpVerify"
import { Users } from "./pages/admin/Users"
import {AdminLayout} from "./components/layouts/AdminLayout"
import { Orders } from "./pages/admin/Orders"
import { Contacts } from "./pages/admin/Contacts"
import './App.css'

function App() {

  return <>
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OtpVerify />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:id" element={<Book />} />

        <Route path="/user" element={<UserLayout/>}>
          <Route path="profile" element={<Profile/>} />
          <Route path="order/show" element={<ShowOrders/>} />
          <Route path="cart/:uid" element={<Cart/>} />
          <Route path="order/:uid" element={<Order/>} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<Users/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="contacts" element={<Contacts/>} />
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer/>
    </BrowserRouter>
  </>
}

export default App
