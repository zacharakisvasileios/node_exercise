import React from "react";
import { Modal, Form, Input } from "antd";

const UpdateMessage = ({ visible, setVisible, editedMessage, updateData }) => {
  const [form] = Form.useForm();
  const onFinish = (formValues) => {
    updateData(editedMessage.id, formValues);
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
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sender"
              label="Sender"
              initialValue={editedMessage.sender}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="receiver"
              label="Receiver"
              initialValue={editedMessage.receiver}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="seen"
              label="Seen"
              initialValue={editedMessage.seen}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="timestampSent"
              label="Timestamp sent"
              initialValue={editedMessage.timestampSent}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateMessage;
