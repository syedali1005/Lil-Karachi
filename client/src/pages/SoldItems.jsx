import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Table } from "antd";
import axios from "axios";

const SoldItems = () => {
  const [itemsData, setItemsData] = useState([]);
  const [totalGenerated, setTotalGenerated] = useState(0); // State for total amount generated

  const getItemsSummary = async () => {
    try {
      const { data } = await axios.get("/api/bills/get-sold-items-summary"); // Adjusted endpoint URL
      setItemsData(data);

      // Calculate total money generated
      const total = data.reduce((acc, item) => acc + item.moneyGenerated, 0);
      setTotalGenerated(total);
    } catch (error) {
      console.error("Failed to fetch items summary:", error);
    }
  };

  useEffect(() => {
    getItemsSummary();
  }, []);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantitySold",
      key: "quantitySold",
    },
    {
      title: "Money Generated",
      dataIndex: "moneyGenerated",
      key: "moneyGenerated",
      render: (text) => `Rs${text}`,
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Sold Items Summary</h1>
      </div>
      <Table columns={columns} dataSource={itemsData} rowKey="itemName" bordered />

      {/* Display Total Amount Generated */}
      <div className="d-flex justify-content-end mt-3">
        <h1>Total Amount Generated: Rs {totalGenerated}</h1>
      </div>
    </DefaultLayout>
  );
};

export default SoldItems;
