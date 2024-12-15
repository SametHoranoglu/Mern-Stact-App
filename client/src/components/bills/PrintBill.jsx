import { Modal, Button } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-teal-700" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-600">OverFlow</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-600">Fatura Detayı:</p>
                  <p>{customer?.customerName}</p>
                  <p>Fatura Tarihi: 19 Kasım 2024</p>
                  <p>Ödenecek Tutar: 500,00 ₺</p>
                  <p>CA 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-600">Fatura</p>
                  The Borig Company
                  <p>Işık Caddesi 007</p>
                  <p>Siverek</p>
                  <p>Şanlıurfa 0063</p>
                </div>
                <div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-600">Fatura Numarası:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-600 mt-5">
                      Veriliş Tarihi:
                    </p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="text-md text-slate-500 sm:block hidden">
                    <p className="font-bold text-slate-600 ">Şartlar:</p>
                    <p>1 Hafta</p>
                  </div>
                  <div className="text-md text-slate-500 sm:block hidden">
                    <p className="font-bold text-slate-600 mt-5">Vade:</p>
                    <p>2023-02-19</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm text-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm text-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Başlık
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5 text-left text-sm text-normal text-slate-700  md:pl-0  sm:hidden"
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm text-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm text-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm text-normal text-slate-700  md:pl-0  "
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-t border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim fiyatı:{item.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim fiyatı:{item.price}₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4  text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4  sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4  text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}₺</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-4  font-normal" scope="row">
                      <span className="font-normal text-slate-700 ">
                        {customer?.subTotal}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">KDV</p>
                    </th>
                    <th className="text-right pt-4  font-normal" scope="row">
                      <span className="font-normal text-red-600">
                        {customer?.tax}₺
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Genel Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right pt-4  font-normal" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}₺
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-300">
                  <p className="text-sm font-light text-slate-700">
                    Ödeme Koşulları Ödeme Yöntemi: Ödemeler, banka havalesi,
                    kredi kartı veya nakit olarak yapılabilir. Ödeme Süresi:
                    Fatura tarihinden itibaren 30 gün içinde ödeme yapılması
                    gerekmektedir. Gecikme Faizi: Ödeme süresi içinde yapılmayan
                    ödemeler için, her gecikilen gün için %2 gecikme faizi
                    uygulanacaktır. Ödeme Planı: Eğer ödeme tek seferde
                    yapılacaksa, tüm tutarın fatura tarihi itibariyle ödenmesi
                    gerekmektedir. Taksitli ödeme seçeneği talep edilmesi
                    durumunda, ödeme planı tarafımızca belirlenip yazılı olarak
                    bildirilecektir. İptal ve İade: Ödeme yapıldıktan sonra,
                    ürünler teslim edilmeden önce iptal edilirse tam iade
                    yapılacaktır. Ürün teslimatından sonra iade kabul
                    edilmemektedir.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
