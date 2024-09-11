import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, message, Form, Input, Select } from "antd";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const [discount, setDiscount] = useState(0); // New state for discount
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);


  // Handle increment
  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  // Handle decrement
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  // Handle submit
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        discount, // Include discount in the request
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          (subTotal - (subTotal * (discount / 100))) + Number(((subTotal / 100) * 10).toFixed(2))
        ), // Calculate total with discount
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      await axios.post("/api/bills/add-bills", newObject);
      message.success("Bill Generated");
      dispatch({ type: "CLEAR_CART" }); // Clear the cart after generating the bill
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    const handleNavigation = () => {
      if (window.location.pathname === "/") {
        dispatch({ type: "CLEAR_CART" });
      }
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [dispatch]);

  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUB TOTAL : Rs<b> {subTotal}</b> /-
        </h3>
        <Button type="primary" onClick={() => setBillPopup(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="cashierName" label="Cashier Name">
            <Input />
          </Form.Item>
          <Form.Item name="tableNumber" label="Table Number">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="orderType"
            label="Order Type"
            rules={[
              { required: true, message: "Please select an order type!" },
            ]}
          >
            <Select>
              <Select.Option value="take away">Take Away</Select.Option>
              <Select.Option value="dine in">Dine In</Select.Option>
              <Select.Option value="self-delivery">Self-Delivery</Select.Option>
              <Select.Option value="foodpanda">FoodPanda</Select.Option>
            </Select>
          </Form.Item>

          {/* New Discount Field */}
          <Form.Item name="discount" label="Discount (%)">
            <Input
              type="number"
              min={0}
              max={100}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </Form.Item>

          <div className="bill-it">
            <h5>
              Sub Total : <b>{subTotal}</b>
            </h5>
            <h4>
              TAX
              <b> {((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h4>
              Discount: <b>{discount}%</b>
            </h4>
            <h3>
              GRAND TOTAL -{" "}
              <b>
                {Number(
                  subTotal - (subTotal * (discount / 100)) +
                  Number(((subTotal / 100) * 10).toFixed(2))
                )}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default Cart;
