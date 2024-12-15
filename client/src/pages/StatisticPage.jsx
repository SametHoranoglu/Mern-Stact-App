import { Spin } from "antd";
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard.jsx";
import { Area, Pie } from "@ant-design/plots";
import React, { useEffect, useState } from "react";


const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"))
  console.log(user);
  

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch =() =>{
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error)=>{
      console.log("fetch data failed", error);
      
    })
  }

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




  const config = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/aapl.json",
    },
    xField: "subTotal", // Tarihi doğrudan alan olarak belirtiyoruz
    yField: "customerName",
    xAxis: {
      type: "timeCat",
    },
  };

  const config2 = {
    data,
    angleField: "subTotal",
    colorField: "customerName",
    innerRadius: 0.6,
    label: {
      text: "subTotal",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 10,
        x: "50%",
        y: "90%",
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Toplam\nDeğer",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
    width: 450, // Genişlik
    height: 450, // Yükseklik
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0)
    return `${amount.toFixed(2)} ₺`;
  }

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
      {data ? (
              <div className="md:pb-10 ">
              <div className="satatistic-section ml-10 mr-10">
                <h2 className="text-lg">
                  Hoş geldin{" "}
                  <span className="text-green-700 font-bold text-xl">{user.username}</span>.
                </h2>
                <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
                  <StatisticCard
                    title={"Toplam Müşteri"}
                    amount={data?.length}
                    img={"Photo/customer.png"}
                  />
                  <StatisticCard
                    title={"Toplam Kazanç"}
                    amount={totalAmount()}
                    img={"Photo/earning.png"}
                  />
                  <StatisticCard
                    title={"Toplam Satış"}
                    amount={data?.length}
                    img={"Photo/sales.png"}
                  />
                  <StatisticCard
                    title={"Toplam Ürün"}
                    amount={products?.length}
                    img={"Photo/products.png"}
                  />
                </div>
                <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
                  {/* Burada doğrudan Area bileşenini çağırıyoruz */}
                  <div className="lg:w-1/2 w-[485px] lg:h-full h-72 ">
                    <Area {...config} />
                  </div>
                  <div className="lg:w-1/3 w-[430px] lg:h-full h-72 ">
                    <Pie {...config2} />
                  </div>
                </div>
              </div>
            </div>
      ): (
        <Spin
        size="large"
        className="absolute top-1/2 h-screen w-screen flex justify-center "
      />
      )}
    </>
  );
};

export default StatisticPage;
