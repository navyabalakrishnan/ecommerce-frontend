import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import Homepage from './Components/homepage.jsx';

import Signup from './Components/user/userSignup.jsx';
import Signin from './Components/user/userSigin.jsx';
import SellerSignup from './Components/seller/Signup.jsx';
import SellerSignin from './Components/seller/Signin.jsx';
import HomeLayout from './layout/HomeLayout.jsx';
import Navbar from './layout/Navbar.jsx';
import Allproducts from './Components/product/Allproducts.jsx';
import ProductDetail from './Components/product/productDetail.jsx';
import Cart from './Components/product/Cart.jsx';
import CheckoutPage from './Components/product/CheckoutPage.jsx';
import FinalProductpage from './Components/product/FinalProductpage.jsx';
import Selleradminnav from './layout/Selleradminnav.jsx';
import AddProduct from './Components/seller/AddProduct.jsx';
import ManageSellers from './Components/admin/manageSellers.jsx';
import ManageProducts from './Components/seller/ManageProducts.jsx';
import ManageOrders from './Components/seller/ManageOrders.jsx';
import Vieworders from './Components/admin/Vieworders.jsx';
import Viewproducts from './Components/admin/ViewProducts.jsx';
import Indexpage from './Indexpage.jsx';
import ProtectedRoute from './Components/protectedRoute.jsx'; 

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Indexpage />
      },
      {
        path: "/user-signup",
        element: <Signup />
      },
      {
        path: "/user-signin",
        element: <Signin />
      },
      {
        path: "/seller-signup",
        element: <SellerSignup />
      },
      {
        path: "/seller-signin",
        element: <SellerSignin />
      },
    ]
  },
  {
    element: <ProtectedRoute>
      <Navbar/>
      </ProtectedRoute>, 
    children: [
      {
        path: "/home",
        element: <Homepage />
      },
      {
        path: "/products",
        element: <Allproducts />
      },
      {
        path: "/viewproduct/:id",
        element: <ProductDetail />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/shop",
        element: <Allproducts />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />
      },
      {
        path: "/orderplaced",
        element: <FinalProductpage />
      }
    ]
  },
  {
    element: <ProtectedRoute>
      <Selleradminnav />
      </ProtectedRoute>, 
    children: [
      {
        path: "/add-product",
        element: <AddProduct />
      },
      {
        path: "/manage-products",
        element: <ManageProducts />
      },
      {
        path: "/manage-orders",
        element: <ManageOrders />
      },
      {
        path: "/manage-sellers",
        element: <ManageSellers />
      },
      {
        path: "/view-orders",
        element: <Vieworders />
      },
      {
        path: "/view-products",
        element: <Viewproducts />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
