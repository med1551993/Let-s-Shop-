import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categorySlice";
import { getCartTotal } from "../../store/cartSlice";
import { formatPrice } from "../../utils/helpers";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.category.data);
  const [isSidebarOpen, setIssidebarOpen] = useState(false);
  const { totalItems,totalAmount,deliveryCharge } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
  }, []);

  return (
    <nav className="navbar bg-regal-blue">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-white">Let's </span>
              <span className="text-gold">SHOP</span>
            </Link>

            <form className="navbar-search flex">
              <input type="text" placeholder="Search here..." />
              <button type="submit" className="navbar-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
              <div className="btn-txt fw-2">
                {formatPrice(totalAmount)}
                </div>
                <span className="btn-ico btn-txt fw-5">
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-count-value">{totalItems}</span>
                </span>
               {/*  <div className="btn-txt fw-5">
                  Cart
                </div> */}
               

              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-bottom ">
          <div className="container flex flex-start">
            <ul
              className={`nav-links flex ${
                isSidebarOpen ? "show-nav-links" : ""
              }`}
            >
              <button
                type="button"
                className="navbar-hide-btn text-white"
                onClick={() => setIssidebarOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="nav-link text-white"
                    onClick={() => setIssidebarOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="navbar-show-btn text-gold"
              onClick={() => setIssidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
