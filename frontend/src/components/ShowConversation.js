import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Empty, Result, message } from "antd";
import { useParams } from "react-router-dom";

const SERVER_URI = "http://localhost:8080";

const ShowConversationComponent = () => {
  const [messages, setMessages] = useState([]);
  // it is actually userA and userB
  let { sender, receiver } = useParams();
  const [error, setError] = useState(false);
  console.log("sender", sender);
  console.log("receiver", receiver);

  useEffect(() => {
    findConversation();
  }, []);

  const findConversation = async () => {
    axios
      .get(`${SERVER_URI}/user/messages/${sender}/${receiver}`)
      .then((res) => {
        if (res.status === 200) {
          setMessages(res.data);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        message.error(error.message);
        setError(true);
      });
  };
  // Duplicate code with Show messages
  // Should be implemented with search function in antd table

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
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
  ];

  return (
    <>
      {messages.length === 0 && !error && (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>No messages found</span>}
          ></Empty>
        </div>
      )}
      {messages.length !== 0 && !error && (
        <>
          <Table
            rowKey={(messages) => messages.id}
            dataSource={messages}
            columns={columns}
            bordered
            title={() => "Messages"}
          ></Table>
        </>
      )}
      {error && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      )}
    </>
  );
};

export default ShowConversationComponent;
