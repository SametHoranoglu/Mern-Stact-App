import { Form, Input, Modal, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispacth = useDispatch()
  const navigate = useNavigate()

  const onFinish = async(values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total + cart.tax )/ 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        message.success("Fatura Başarıyla Oluşturuldu.");
        dispacth(reset)
        navigate("/bills")
      }
    } catch (error) {
      message.error("Fatura Oluşturulamadı.");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            name="customerName"
            rules={[
              { required: true, message: "Müşteri adı alanı boş geçilemez" },
            ]}
          >
            <Input placeholder="Bir müşteri adı yazınız." />
          </Form.Item>

          <Form.Item
            label="Tel No"
            name="customerPhoneNumber"
            rules={[{ required: true, message: "Telefon numarası gerekli" }]}
          >
            <Input placeholder="Bir telefon numarası giriniz." maxLength={11} />
          </Form.Item>

          <Form.Item
            label="Ödeme Yöntemi"
            name="paymentMode"
            rules={[{ required: true, message: "Ödeme yöntemi seçiniz" }]}
          >
            <Select placeholder="Ödeme yöntemi seçiniz.">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Card>
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? ((cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              className="mt-2"
              type="primary"
              htmlType="submit" // Formu tetikleyen buton
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateBill;
