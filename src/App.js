import logo from "./logo.svg";
import "./App.css";
import Commerce from "@chec/commerce.js";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavbarContext from "./context/NavbarContext";
import axios from "axios";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import BreadcrumContext from "./context/BreadcrumContext";
import SearchResult from "./pages/SearchResult";
import CartContext from "./context/CartContext";
import Cart from "./pages/Cart";

// const commerce = new Commerce(
//   "pk_556894dd5b9a1d37b4b2b6807fea07b3c491d6c02944c"
// );
const Wrapper = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 40px;
`;
function App() {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [breadcrum, setBreadcrum] = useState([]);
  const [cart, sCart] = useState(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : []
  );
  const arr = JSON.parse(localStorage.getItem("cart"));

  let t = 0;
  for (let i = 0; i < arr?.length; i++) {
    t = t + Number(arr[i].quantity);
  }
  const [totalCartItems, setTotalCartItems] = useState(t);
  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      let total = 0;
      sCart(JSON.parse(storedData));
      let sData = JSON.parse(storedData);
      for (let i = 0; i < sData.length; i++) {
        total = sData[i].quantity + total;
      }
    }
  }, []);

  const addToCart = (id, name, image, price) => {
    let newObject = {
      id: id,
      quantity: 1,
      name: name,
      image: image,
      price: price,
    };
    if (cart.length) {
      let ind = cart.findIndex((obj) => obj.id == id);
      if (ind >= 0) {
        let c = [...cart];
        let quantity = c[ind].quantity;
        c[ind] = { ...c[ind], quantity: quantity + 1 };
        sCart(c);
        setTotalCartItems(Number(totalCartItems) + 1);
      } else {
        sCart((prev) => [...prev, newObject]);
        setTotalCartItems(Number(totalCartItems) + 1);
      }
    } else {
      sCart((prevArray) => [...prevArray, newObject]);
      setTotalCartItems(Number(totalCartItems) + 1);
    }
  };

  const decreaseItem = (index) => {
    let c = [...cart];
    c[index].quantity = c[index].quantity - 1;
    if (cart[index].quantity == 0) {
      c.splice(index, 1);
    }
    sCart(c);
    setTotalCartItems(Number(totalCartItems) - 1);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.chec.io/v1/categories", {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_PUBLIC_KEY}`,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        totalCartItems,
        setTotalCartItems,
        decreaseItem,
      }}
    >
      <NavbarContext.Provider value={{ categories, setCategories, loading }}>
        <Wrapper>
          <BreadcrumContext.Provider value={{ breadcrum, setBreadcrum }}>
            <Router>
              <Routes>
                <Route element={<Home />} path="/"></Route>
                <Route element={<Product />} path="/product/:id"></Route>
                <Route
                  element={<SearchResult />}
                  path="/searchresult/:query"
                ></Route>
                <Route element={<Cart />} path="/cart" />
              </Routes>
            </Router>
          </BreadcrumContext.Provider>

          <Footer />
        </Wrapper>
      </NavbarContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
