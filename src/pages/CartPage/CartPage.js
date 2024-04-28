import React, { useEffect } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  clearCart,
  toggleCartQty,
  getCartTotal,
} from "../../store/cartSlice";
import { formatPrice } from "../../utils/helpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const CartPage = () => {
  const dispatch = useDispatch();
  const {
    data: cartProducts,
    totalItems,
    totalAmount,
    deliveryCharge,
  } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCartTotal());
  }, [useSelector((store) => store.cart)]);

  const emptyCartMsg = <h4 className="text-red fw-6">No items found!</h4>;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
      </div>

      <div className="bg-ghost-white py-5">
        <div className="container">
          <div className="section-title">
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
              My Cart
            </h3>
          </div>

          {cartProducts.length === 0 ? (
            emptyCartMsg
          ) : (
            <div className="cart-content grid">
              <div className="cart-left">
                {/*     <div className="cart-items grid"> */}
                <TransitionGroup className="cart-items grid">
                  {cartProducts.map((cartProduct) => (
                    <CSSTransition
                      key={cartProduct.id}
                      timeout={500}
                      classNames="item"
                    >
                      <div className="cart-item grid" key={cartProduct.id}>
                        <div className="cart-item-img flex flex-column bg-white">
                          <img
                            src={cartProduct.images[0]}
                            alt={cartProduct.title}
                          />
                          <button
                            type="button"
                            className="btn-square rmv-from-cart-btn"
                            onClick={() =>
                              dispatch(removeFromCart(cartProduct.id))
                            }
                          >
                            <span className="btn-square-icon">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </div>

                        <div className="cart-item-info">
                          <h6 className="fs-16 fw-5 text-light-blue">
                            {cartProduct.title}
                          </h6>
                          <div className="qty flex">
                            <span className="text-light-blue qty-text">
                              Qty:{" "}
                            </span>
                            <div className="qty-change flex">
                              <button
                                type="button"
                                className="qty-dec fs-14"
                                onClick={() =>
                                  dispatch(
                                    toggleCartQty({
                                      id: cartProduct.id,
                                      type: "DEC",
                                    })
                                  )
                                }
                              >
                                <i className="fas fa-minus text-light-blue"></i>
                              </button>
                              <span className="qty-value flex flex-center">
                                {cartProduct.quantity}
                              </span>
                              <button
                                type="button"
                                className="qty-inc fs-14 text-light-blue"
                                onClick={() =>
                                  dispatch(
                                    toggleCartQty({
                                      id: cartProduct.id,
                                      type: "INC",
                                    })
                                  )
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-between">
                            <div className="text-pine-green fw-4 fs-15 price">
                              Price: {formatPrice(cartProduct.price)}.00
                            </div>
                            <div className="sub-total fw-6 fs18 text-regal-blue">
                              <span>Sub Total: </span>
                              <span>{formatPrice(cartProduct.totalPrice)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
                {/*   </div> */}

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => dispatch(clearCart())}
                >
                  <span className="fs-16">Clear Cart</span>
                </button>
              </div>

              <div className="cart-right bg-white">
                <div className="cart-summary text-light-blue">
                  <div className="cart-summary-title">
                    <h6 className="fs-20 fw-5">Order Summary</h6>
                  </div>
                  <ul className="cart-summary-info">
                    <li className="flex flex-between">
                      <span className="fw-4">
                        Selected {totalItems} item(s) Price
                      </span>
                      <span className="fw-7">{formatPrice(totalAmount)}</span>
                    </li>
                    <li className="flex flex-between">
                      <span className="fw-4">Discount</span>
                      <span className="fw-7">
                        <span className="text-red fw-5">-&nbsp;</span>
                        {formatPrice(0)}
                      </span>
                    </li>
                    <li className="flex flex-between">
                      <span className="fw-4">Delivery Cost</span>
                      <span className="fw-7">
                        <span className="text-gold fw-5">+&nbsp;</span>
                        {formatPrice(deliveryCharge)}
                      </span>
                    </li>
                  </ul>
                  <div className="cart-summary-total flex flex-between fs-18">
                    <span className="fw-6">Grand Total: </span>
                    <span className="fw-6">
                      {formatPrice(totalAmount + deliveryCharge)}{" "}
                    </span>
                  </div>
                  <div className="cart-summary-btn">
                    <button type="button" className="btn-secondary">
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
