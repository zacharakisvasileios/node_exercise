import React from "react";
import { Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const SearchMessages = ({
  isSearchMessagesModalVisible,
  setIsSearchMessagesModalVisible,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (formValues) => {
    setIsSearchMessagesModalVisible(false);
    navigate(`/showMessages/${formValues.sender}/${formValues.receiver}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Modal
        title={`Search for conversation`}
        mask={false}
        open={isSearchMessagesModalVisible}
        destroyOnClose={true}
        onOk={form.submit}
        onCancel={() => setIsSearchMessagesModalVisible(false)}
        okText={"Search"}
      >
        <Form
          form={form}
          preserve={false}
          name="Please specify sender and receiver id"
          width={"350px"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="">
            <Form.Item
              name="sender"
              label="Sender"
              rules={[
                {
                  required: true,
                  message: "Sender id must be specified",
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="receiver"
              label="Receiver"
              rules={[
                {
                  required: true,
                  message: "Receiver id must be specified",
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SearchMessages;
