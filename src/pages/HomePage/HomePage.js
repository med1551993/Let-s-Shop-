import React, { useEffect } from "react";
import Sliderimg from "../../components/Slider/Sliderimg";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import "./HomePage.scss";
import Category from "../../components/Category/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../store/categorySlice";
import { fetchProducts } from "../../store/productSlice";
import ProductList from "../../components/ProductList/ProductsList";

const HomePage = () => {
  const dispatch = useDispatch();

  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );

  const { catProductAll: productsByCategory, catProductAllStatus } =
    useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchProductsByCategory(1, "all"));
    dispatch(fetchProductsByCategory(2, "all"));
  }, []);

  return (
    <div className="home-page">
     <Sliderimg />
      <Category data={categories} status={categoryStatus} /> 
      
      <ProductList products={products} status={productStatus} />

      {/* category one products */}
      <section>
        {productsByCategory[0] && (
          <SingleCategory
            products={productsByCategory[0]}
            status={catProductAllStatus}
          />
        )}
      </section>

      {/* category two products */}
      <section>
        {productsByCategory[1] && (
          <SingleCategory
            products={productsByCategory[1]}
            status={catProductAllStatus}
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
