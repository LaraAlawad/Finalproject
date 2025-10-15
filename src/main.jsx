import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import CreateAccount from "./pages/auth/CreateAccount";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot/ForgotPassword";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About"; //  صفحة about
import Contact from "./pages/contact/Contact"; //  صفحة contact
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user-home", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/profile", element: <Profile /> },
      { path: "/about", element: <About /> },  
      { path: "/contact", element: <Contact /> },  
    ],
  },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
