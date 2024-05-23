import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Shop from "./pages/shop";
import ShopCategory from './pages/shopCategory';
import LoginSignup from "./pages/LoginSignup";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Footer from './components/footer/Footer';
import men_banner from "./components/Assets/banner_mens.png"
import women_banner from "./components/Assets/banner_women.png"
import kids_banner from "./components/Assets/banner_kids.png"
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/men' element={<ShopCategory  banner={men_banner} category="men" />} />
        <Route path='/women' element={<ShopCategory  banner={women_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory   banner={kids_banner} category="kid" />} />
        <Route path='/product' element={<Product />} >
        <Route path=':productId' element={<Product />} />
        </Route>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  ); 
}

export default App;
