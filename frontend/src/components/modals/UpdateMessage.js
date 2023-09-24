import React from "react";
import { Modal, Form, Input, Switch } from "antd";

const UpdateMessage = ({
  visible,
  setVisible,
  updateMessage,
  editedMessage,
}) => {
  const [form] = Form.useForm();
  const onFinish = (formValues) => {
    updateMessage(editedMessage.id, formValues);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div>
      <Modal
        title={`Update message ${editedMessage.id}`}
        mask={false}
        open={visible}
        destroyOnClose={true}
        onOk={form.submit}
        onCancel={() => setVisible(false)}
        okText={"Update Message"}
      >
        <Form
          form={form}
          preserve={false}
          name="Update message"
          width={"350px"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="">
            <Form.Item
              name="content"
              label="Content"
              initialValue={editedMessage.content}
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
              initialValue={editedMessage.sender}
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
              initialValue={editedMessage.receiver}
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
                name="seen"
                label="Seen"
                noStyle
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked={editedMessage.seen}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="timestampSent"
              label="Timestamp sent"
              initialValue={editedMessage.timestampSent}
            >
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateMessage;
