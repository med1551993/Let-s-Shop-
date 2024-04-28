import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../../store/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../../components/ProductList/ProductsList";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { catProductSingle: products, catProductSingleStatus: status } =
    useSelector((store) => store.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, "single"));
  }, [id]);

  return (
    <div className="category-page">
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
            <li>
              Category
              <span className="breadcrumb-separator">
                <i className="fas fa-chevron-right"></i>
              </span>
            </li>
            <li>{products[0] && products[0].category.name}</li>
          </ul>
        </div>
      </div>
      <ProductsList products={products} productStatus={status} />
    </div>
  );
};

export default CategoryPage;
