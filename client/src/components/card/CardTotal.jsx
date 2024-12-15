import { Button, message } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrase, reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CardTotal = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-screen max-h-[calc(100vh_-_90px)] flex flex-col ">
      <h2 className="bg-teal-700 text-center py-4 text-white font-bold -tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="card-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover cursor-pointer"
                    onClick={() => {
                      dispatch(deleteCart(item));
                      message.success("Ürün Sepetten Silindi");
                    }}
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center">
                    {item.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Ürün silinsin mi?")) {
                          dispatch(decrase(item));
                          message.success("Ürün sepetten silindi!");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrase(item));
                      }
                    }}
                  />
                </div>
              </li>
            )).reverse()
          : "Sepette ürün bulunmuyor!"}
      </ul>

      <div className="cart-totals mt-auto">
        <div className="border-t border-b ">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-600">
              +
              {(cart.total * cart.tax) / 100 > 0
                ? ((cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2 ">
            <b className="text-xl text-teal-700 ">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py px-2">
          <Button
            type="primary"
            size="large"
            className="text-white w-full mb-2 bg-teal-600 hover:bg-slate-700"
            disabled={cart.cartItems.length === 0}
            onClick={() => navigate("/cart")}
          >
            Sipariş Olustur
          </Button>
        </div>
        <div className="py px-2">
          <Button
            type="primary"
            size="large"
            className="w-full"
            danger
            disabled={cart.cartItems.length === 0}
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm("Emin misiniz?")) {
                dispatch(reset());
                message.success("Sepet Temizlendi!");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardTotal;
