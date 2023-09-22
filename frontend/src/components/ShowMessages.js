import axios from "axios";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { Space, Table } from "antd";

const SERVER_URI = "http://localhost:8080";

const ShowMessagesComponent = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const res = await axios.get(`${SERVER_URI}/message`);
    setMessages(res.data);
  };

  const columns = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Seen",
      dataIndex: "seen",
      key: "seen",
      render: (text) => String(text),
    },
    {
      title: "Timestamp Sent",
      dataIndex: "timestampSent",
      key: "timestampSent",
    },
    {
      title: "Action",
      dataIndex: "timestampSent",
      key: "action",
      render: () => (
        <Space size="middle">
          <a href="/#" onClick={() => console.log("on click")}>
            Update{" "}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(messages) => messages.id}
      dataSource={messages}
      columns={columns}
    ></Table>
  );
};

export default ShowMessagesComponent;
