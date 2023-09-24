import "./App.css";

import ShowMessagesComponent from "./components/ShowMessages";
import ShowConversationComponent from "./components/ShowConversation";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowMessagesComponent />} />
          <Route
            path="/showMessages/:sender/:receiver"
            element={<ShowConversationComponent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
