import axios from "axios";
import { useState, useEffect } from "react";
import { Space, Table, message } from "antd";
import UpdateMessage from "./modals/UpdateMessage";

const SERVER_URI = "http://localhost:8080";

const ShowMessagesComponent = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isUpdateModalVisibleTrue, setUpdateModalVisibleTrue] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const res = await axios.get(`${SERVER_URI}/message`);
    setMessages(res.data);
  };

  const updateMessage = async (id) => {
    const res = await axios.get(`${SERVER_URI}/message`, {
      params: { id: id },
    });
    setCurrentMessage(res.data[0]);
    setUpdateModalVisibleTrue(true);
  };

  const updateData = (id, formValues) => {
    axios
      .put(`${SERVER_URI}/message/update/${id}`, {
        content: formValues.content,
        sender: formValues.sender,
        receiver: formValues.receiver,
        seen: formValues.seen,
      })
      .then((res) => {
        if (res.status === 200) {
          // close modal, show success message
          setUpdateModalVisibleTrue(false);
          getMessages();
          message.success("Message updated successfully");
        }
      })
      .catch((error) => {
        setUpdateModalVisibleTrue(false);
        message.error(error.message);
      });
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href="/#" onClick={() => updateMessage(record.id)}>
            Update message {record.id}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey={(messages) => messages.id}
        dataSource={messages}
        columns={columns}
        bordered
        title={() => "Messages"}
      ></Table>
      <UpdateMessage
        visible={isUpdateModalVisibleTrue}
        setVisible={setUpdateModalVisibleTrue}
        updateData={updateData}
        editedMessage={currentMessage}
      />
    </>
  );
};

export default ShowMessagesComponent;
