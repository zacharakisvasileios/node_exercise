import axios from "axios";
import { useState, useEffect } from "react";
import { Space, Table, Button, Empty, Result, message } from "antd";
import UpdateMessage from "./modals/UpdateMessage";
import CreateMessage from "./modals/CreateMessage";
import SearchMessages from "./modals/SearchMessages";
import { dateInYyyyMmDdHhMmSs } from "../util";

const SERVER_URI = "http://localhost:8080";

const ShowMessagesComponent = () => {
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isSearchMessagesModalVisible, setIsSearchMessagesModalVisible] =
    useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    axios
      .get(`${SERVER_URI}/message`)
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

  const feedFB = async () => {
    axios
      .post(`${SERVER_URI}/feedDB`)
      .then((res) => {
        if (res.status === 200) {
          getMessages();
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        message.error(error.message);
        setError(true);
      });
  };

  const showUpdateMessageModal = async (id) => {
    // fetch information for the message that is to be updated
    axios
      .get(`${SERVER_URI}/message`, {
        params: { id: id },
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrentMessage(res.data[0]);
          setUpdateModalVisible(true);
        } else {
          message.error("Fetching message information failed");
        }
      })
      .catch((error) => {
        message.error(error.message);
        setError(true);
      });
  };

  const createNewMessage = (formValues) => {
    axios
      .post(`${SERVER_URI}/message/create`, {
        content: formValues.content,
        sender: formValues.sender,
        receiver: formValues.receiver,
        seen: formValues.seen,
        timestampSent: dateInYyyyMmDdHhMmSs(new Date()),
      })
      .then((res) => {
        if (res.status === 200) {
          // close modal, show success message and refetch messages
          setIsCreateModalVisible(false);
          getMessages();
          message.success("Message created successfully");
        }
      })
      .catch((error) => {
        setUpdateModalVisible(false);
        message.error(error.message);
      });
  };

  const updateMessage = (id, formValues) => {
    axios
      .put(`${SERVER_URI}/message/update/${id}`, {
        content: formValues.content,
        sender: formValues.sender,
        receiver: formValues.receiver,
        seen: formValues.seen,
      })
      .then((res) => {
        if (res.status === 200) {
          // close modal, show success message and refetch messages
          setUpdateModalVisible(false);
          getMessages();
          message.success("Message updated successfully");
        }
      })
      .catch((error) => {
        setUpdateModalVisible(false);
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
          <a href="/#" onClick={() => showUpdateMessageModal(record.id)}>
            Update message {record.id}
          </a>
        </Space>
      ),
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
          >
            <Button
              type="primary"
              onClick={() => {
                feedFB();
              }}
            >
              Import messages now
            </Button>
            <div>or</div>
            <Button
              type="primary"
              onClick={() => {
                setIsCreateModalVisible(true);
              }}
            >
              Create a new message
            </Button>
            <CreateMessage
              isCreateModalVisible={isCreateModalVisible}
              setIsCreateModalVisible={setIsCreateModalVisible}
              createNewMessage={createNewMessage}
            />
          </Empty>
        </div>
      )}
      {messages.length !== 0 && !error && (
        <>
          <div className="d-flex justify-content-around mt-4 mb-4">
            <Button
              type="primary"
              onClick={() => {
                setIsCreateModalVisible(true);
              }}
            >
              Create a new message
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsSearchMessagesModalVisible(true);
              }}
            >
              Search for conversation
            </Button>
          </div>
          <Table
            rowKey={(messages) => messages.id}
            dataSource={messages}
            columns={columns}
            bordered
            title={() => "Messages"}
          ></Table>
          <UpdateMessage
            visible={isUpdateModalVisible}
            setVisible={setUpdateModalVisible}
            updateMessage={updateMessage}
            editedMessage={currentMessage}
          />
          <CreateMessage
            isCreateModalVisible={isCreateModalVisible}
            setIsCreateModalVisible={setIsCreateModalVisible}
            createNewMessage={createNewMessage}
          />
          <SearchMessages
            isSearchMessagesModalVisible={isSearchMessagesModalVisible}
            setIsSearchMessagesModalVisible={setIsSearchMessagesModalVisible}
          />
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

export default ShowMessagesComponent;
