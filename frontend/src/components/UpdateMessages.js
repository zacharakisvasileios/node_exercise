import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SERVER_URI = "http://localhost:8080";

const UpdateMessagesComponent = () => {
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [seen, setSeen] = useState("");
  const [timestampSent, setTimestampSent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    await axios.put(`${SERVER_URI}/message/update/${id}`, {
      sender: sender,
      receiver: content,
      seen: seen,
      content: content,
      timestampSent: timestampSent,
    });
    navigate("/");
  };

  useEffect(() => {
    const getMessageById = async () => {
      const res = await axios.get(`${process.env.SERVER_URI}/message/`, { id });
      setSender(res.data.sender);
      setContent(res.data.content);
      setSeen(res.data.seen);
      setTimestampSent(res.data.timestampSent);
    };
    getMessageById();
  }, [id]);

  return (
    <div>
      <h3>Update Message</h3>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Sender</label>
          <input
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMessagesComponent;
