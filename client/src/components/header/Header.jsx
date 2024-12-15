import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  console.log(pathname);

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istegiğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };

  return (
    <div className="border-b mb-6 ">
      <header className="py-4 px-6 flex justify-between items-center gap-10 ">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">SAMET</h2>
          </a>
        </div>
        <div
          className="header-search flex-1"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed z-50 bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0  border-t md:px-0 px-4 py-1">
          <Link
            to={"/"}
            className="menu-link flex flex-col items-center hover:text-[#0f766e] transition-all  "
          >
            <HomeOutlined className="md:taxt-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`menu-link flex flex-col items-center hover:text-[#0f766e] transition-all ${pathname === "/cart" && "!text-[#0f766e]"}`}
            >
              <ShoppingCartOutlined className="md:taxt-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link flex flex-col items-center hover:text-[#0f766e] transition-all ${pathname === "/bills" && "!text-[#0f766e]"}`}
          >
            <CopyOutlined className="md:taxt-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link flex flex-col items-center hover:text-[#0f766e] transition-all ${pathname === "/customers" && "!text-[#0f766e]"}`}
          >
            <UserOutlined className="md:taxt-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link flex flex-col items-center hover:text-[#0f766e] transition-all ${pathname === "/statistic" && "!text-[#0f766e]"}`}
          >
            <BarChartOutlined className="md:taxt-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link flex flex-col items-center hover:text-[#0f766e] transition-all">
              <LogoutOutlined className="md:taxt-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge count={5} offset={[0, 0]} className="md:hidden flex ">
          <Link
            to={"/"}
            className={`menu-link flex flex-col items-center hover:text-[#0f766e] transition-all ${pathname === "/cart" && "!text-[#0f766e]"}`}
          >
            <ShoppingCartOutlined className={`text-2xl ${pathname === "/cart" && "!text-[#0f766e]"}`} />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};
export default Header;
