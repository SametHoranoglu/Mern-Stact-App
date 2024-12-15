import { Button, Form, Input, Modal, message, Select } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarılı Bir Şekilde Eklendi.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün Adı Giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" },
          ]}
        >
          <Input placeholder="Ürün Görseli Giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[{ required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" }]}
        >
          <Input placeholder="Ürün Fiyatı Giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seç"
          rules={[{ required: true, message: "Kategori Adı Alanı Boş Geçilemez!" }]}
        >
          <Select
            showSearch
            placeholder="Ürünü Eklemek İstediğiniz kategoriyi Girin"
            optionFilterProp="title"
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
