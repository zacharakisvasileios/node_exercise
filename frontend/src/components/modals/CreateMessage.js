import React from "react";
import { Modal, Form, Input, Switch } from "antd";

const CreateMessage = ({
  isCreateModalVisible,
  setIsCreateModalVisible,
  createNewMessage,
}) => {
  const [form] = Form.useForm();
  const onFinish = (formValues) => {
    createNewMessage(formValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Modal
        title={`Create message`}
        mask={false}
        open={isCreateModalVisible}
        destroyOnClose={true}
        onOk={form.submit}
        onCancel={() => setIsCreateModalVisible(false)}
        okText={"Create Message"}
      >
        <Form
          form={form}
          preserve={false}
          name="Create message"
          width={"350px"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="">
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Please specify the message",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <div className="d-flex justify-content-between mb-4">
              <span>Seen</span>
              <Form.Item
                valuePropName="checked"
                name="seen"
                label="Seen"
                noStyle
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateMessage;
