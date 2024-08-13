import { useEffect, useState } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col, Button, Typography, Image } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const { Title } = Typography;

const Home = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("drinks");

  const categories = [
    {
      name: "drinks",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "paratha",
      imageUrl: "/roti-canai.png",
    },
    {
      name: "shawarma",
      imageUrl: "/shawarma.png",
    },
    {
      name: "bbq",
      imageUrl: "/grilling.png",
    },
    {
      name: "burger",
      imageUrl: "/burger.png",
    },
    {
      name: "pizza",
      imageUrl: "/pizza.png",
    },
    {
      name: "roll",
      imageUrl: "/spring-rolls.png",
    },
    {
      name: "fries",
      imageUrl: "/fried-potatoes.png",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        console.log(error);
        dispatch({ type: "HIDE_LOADING" });
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className="category-container">
        {categories.map((category) => (
          <Button
            key={category.name}
            className={`category-button ${
              selectedCategory === category.name ? "category-button-active" : ""
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <Image
              src={category.imageUrl}
              alt={category.name}
              preview={false}
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {category.name}
            </Title>
          </Button>
        ))}
      </div>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <ItemList item={item} />
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
};

export default Home;
