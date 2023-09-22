import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URI = "http://localhost:8080";

const CreateMessagesComponent = () => {
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");
  const navigate = useNavigate();

  const createMessage = async (e) => {
    e.preventDefault();
    await axios.post(`${SERVER_URI}/message/create`, {
      sender: sender,
      content: content,
    });
    navigate("/");
  };

  return (
    <div>
      <h3>Create Message</h3>
      <form onSubmit={createMessage}>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <input
            value={sender}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sender</label>
          <textarea
            value={content}
            onChange={(e) => setSender(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateMessagesComponent;
