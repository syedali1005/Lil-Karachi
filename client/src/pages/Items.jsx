import { useEffect, useState, useCallback } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";

const Item = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getAllItems = useCallback(async () => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
    } catch (error) {
      message.error("Failed to fetch items");
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  }, [dispatch]);

  useEffect(() => {
    getAllItems();
  }, [getAllItems]);

  const handleDelete = async (record) => {
    try {
      dispatch({ type: "SHOW_LOADING" });
      await axios.delete(`/api/items/delete-item/${record._id}`);
      message.success("Item Deleted Successfully");
      getAllItems();
    } catch (error) {
      message.error("Failed to delete item");
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
      setPopupModal(false);
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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (values) => {
    const apiEndpoint = editItem
      ? "/api/items/edit-item"
      : "/api/items/add-item";
    const payload = editItem ? { ...values, itemId: editItem._id } : values;
  
    try {
      dispatch({ type: "SHOW_LOADING" });
      if (editItem) {
        await axios.put(apiEndpoint, payload); // PUT for edit
      } else {
        await axios.post(apiEndpoint, payload); // POST for add
      }
      message.success(`Item ${editItem ? "Updated" : "Added"} Successfully`);
      getAllItems();
    } catch (error) {
      message.error(`Failed to ${editItem ? "update" : "add"} item`);
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
      setPopupModal(false);
      setEditItem(null);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>

      <Table columns={columns} dataSource={itemsData} bordered rowKey="_id" />

      {popupModal && (
        <Modal
          title={`${editItem ? "Edit Item" : "Add New Item"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter the item name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter the item price" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Image URL"
              rules={[
                { required: true, message: "Please enter the image URL" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="paratha">Paratha</Select.Option>
                <Select.Option value="shawarma">Shawarma</Select.Option>
                <Select.Option value="bbq">BBQ</Select.Option>
                <Select.Option value="burger">Burger</Select.Option>
                <Select.Option value="pizza">Pizza</Select.Option>
                <Select.Option value="roll">Roll</Select.Option>
                <Select.Option value="fries">Fries</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Item;
