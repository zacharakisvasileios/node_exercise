import "./App.css";

import ShowMessagesComponent from "./components/ShowMessages";
import CreateMessagesComponent from "./components/CreateMessages";
import UpdateMessagesComponent from "./components/UpdateMessages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowMessagesComponent />} />
          <Route path="/create" element={<CreateMessagesComponent />} />
          <Route path="/update/:id" element={<UpdateMessagesComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
