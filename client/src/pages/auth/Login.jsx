import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();
      console.log(user);
      
      if (!user.username || !user.email) {
        message.error("Kullanıcı bilgileri eksik.");
        setLoading(false);
        return;
      }
      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giriş işlemi başarılı");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı.");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      }
      setLoading(false);
    } catch (error) {
      message.error("Giriş yapılamadı.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full bg-slate-300">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center  text-5xl font-bold mb-2">Samet</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                { required: true, message: "E-mail alanı boş bırakılamaz!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                { required: true, message: "Şifre alanı boş bırakılamaz!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz Bir Hesabınız Yok Mu?&nbsp;{" "}
            <Link to="/register" className="text-blue-700 ">
              {" "}
              Kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/4 md:w-1/2 md:flex hidden  bg-emerald-900 h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="h-full px-6" autoplay>
                <AuthCarousel
                  img="/İmages/YoneticiPaneli.png"
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
                <AuthCarousel
                  img="/İmages/MusteriMemnuniyeti.png"
                  title="Müşteri Memniniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Kalan Müşteriler"
                />
                <AuthCarousel
                  img="/İmages/İstatistik.png"
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="/İmages/cihaz.png"
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
