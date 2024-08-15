import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
const Cutomer = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cashier Name",
      dataIndex: "cashierName",
    },
    { title: "Table No", dataIndex: "tableNumber" },
  ];

  return (
    <DefaultLayout>
      <h1>Cutomer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default Cutomer;
