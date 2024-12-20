import { Form, Input, Button, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Register = () => {
  const navigate  = useNavigate()
  const [loading, setLoading] = useState(false)
  const onFinish = async (values) =>{
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      if (res.status === 200) {
        message.success("Kayıt işlemi başarılı")
        navigate("/login")
        setLoading(false)
      }      
    } catch (error) {
      message.error("Kayıt yapılamadı.")
      console.log(error);
      
    }
    
  } 
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full bg-slate-300">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center  text-5xl font-bold mb-2">OverFlow</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"Username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı adı alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Şifreyi tekrar giriniz"
              name={"passwordAgain"}
              dependencies={[]}
              rules={[
                {
                  required: true,
                  message: "Şifre tekrar alanı boş bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Şifreler aynı olmak zorunda!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir Hesabınız var mı?&nbsp;{" "}
            <Link to="/login" className="text-blue-700 ">
              {" "}
              Giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/4 md:w-1/2 md:flex hidden  bg-emerald-900 h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="h-full px-6" autoplay>
              <AuthCarousel img="/İmages/YoneticiPaneli.png" title="Yönetici Paneli" desc="Tek Yerden Yönetim" />
              <AuthCarousel img="/İmages/MusteriMemnuniyeti.png" title="Müşteri Memniniyeti" desc="Deneyim Sonunda Üründen Memnun Kalan Müşteriler" />
              <AuthCarousel img="/İmages/İstatistik.png" title="İstatistikler" desc="Geniş Tutulan İstatistikler" />
              <AuthCarousel img="/İmages/cihaz.png" title="Responsive" desc="Tüm Cihaz Boyutlarıyla Uyumluluk" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;
