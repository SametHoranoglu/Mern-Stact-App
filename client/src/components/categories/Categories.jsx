import "./style.css";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("TÜMÜ");

  useEffect(() => {
    if (categoryTitle === "TÜMÜ") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  console.log(categoryTitle);

  return (
    <ul className="flex gap-4 md:flex-col">
      {categories.map((item) => (
        <li
          className={`category-item ${
            item.title === categoryTitle && "!bg-slate-700"
          }`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-blue-400 hover:opacity-60"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text2xl" />
      </li>
      <li
        className="category-item !bg-blue-800 hover:opacity-60"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
