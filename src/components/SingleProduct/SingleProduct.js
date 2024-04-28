import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SingleProduct.scss";
import { setIsModalVisible } from "../../store/modalSlice";
import { formatPrice } from "../../utils/helpers";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { getCartTotal } from "../../store/cartSlice";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const SingleProduct = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { data: product } = useSelector((store) => store.modal);

  const increaseQty = () => {
    setQty((qty) => {
      let newQty = qty + 1;
      return newQty;
    });
  };

  const decreaseQty = () => {
    setQty((qty) => {
      let newQty = qty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      return newQty;
    });
  };

  const addToCartHandler = (product) => {
    let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    dispatch(getCartTotal());
    navigate("/cart");
  };

  return (
    <div className="overlay-bg">
      <div className="product-details-modal bg-white">
        <button
          type="button"
          className="modal-close-btn flex flex-center fs-14"
          onClick={() => dispatch(setIsModalVisible(false))}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="details-content grid">
          {/*left details*/}
          <div className="left-details">
            <div className="detail-img">
              <img src={product.images[imgIndex]} alt={product.title} />
            </div>
            <div className="detail-imgs flex">
              <img
                src={product.images[0]}
                alt={product.title}
                onClick={() => setImgIndex(0)}
              />
              <img
                src={product.images[1]}
                alt={product.title}
                onClick={() => setImgIndex(1)}
              />
              <img
                src={product.images[2]}
                alt={product.title}
                onClick={() => setImgIndex(2)}
              />
            </div>
          </div>

          <div className="right-details">
            <div className="details-info">
              <h3 className="title text-regal-blue fs-22 fw-5">
                {product.title}
              </h3>
              <p className="description text-pine-green">
                {product.description}
              </p>
              <div className="price fw-7 fs-24">
                Price: {formatPrice(product.price)}
              </div>
              <div className="qty flex">
                <span className="qty-text text-light-blue">Qty: </span>
                <div className="qty-change flex">
                  <button
                    type="button"
                    className="qty-dec fs-14 text-light-blue"
                    onClick={() => decreaseQty()}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="qty-value flex flex-center">{qty}</span>
                  <button
                    type="button"
                    className="qty-inc fs-14 text-light-blue"
                    onClick={() => increaseQty()}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <SnackbarProvider />
              <button
                type="button"
                className="btn-primary add-to-cart-btn"
                onClick={() => {
                  addToCartHandler(product);
                  enqueueSnackbar("That was easy!");
                }}
              >
                <span className="btn-icon">
                  <i className="fas fa-cart-shopping"></i>
                </span>
                <span className="btn-text">Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
