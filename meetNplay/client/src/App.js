import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import FriendList from "./components/friend/FriendList";
import AddFriend from "./components/friend/AddFriend";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/signup" element={<NewUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/newFriend" element={<AddFriend />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
