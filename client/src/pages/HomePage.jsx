import React, { useEffect, useState } from "react";
import CardTotal from "../components/card/CardTotal";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
        const data = await res.json();
        if (data) {
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-8 md:pb-0 pb-24">
          <div className="categories overflow-auto max-h-[calc(72vh-_-112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="flex-[8] max-h-[calc(72vh-_-112px)] overflow-auto pd-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="card-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <div>
              <CardTotal />
            </div>
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute top-1/2 h-screen w-screen flex justify-center "  />
      )}
    </>
  );
};

export default HomePage;
