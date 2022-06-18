import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Index from "./components/Index";
import NewUser from "./components/NewUser";
import Home from "./components/Home";
import About from "./components/About";
import FriendList from "./components/friend/FriendList";
import AddFriend from "./components/friend/AddFriend";
import PlaydateList from "./components/playdate/Main";
import NewPlaydate from "./components/playdate/New";
import EditPlaydate from "./components/playdate/Edit";
import PlaydateDetail from "./components/playdate/Details";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/signup" element={<NewUser />} />
          <Route path="/home" element={<PlaydateList />} />

          <Route path="/about" element={<About />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/newFriend" element={<AddFriend />} />

          <Route path="/playdates" element={<PlaydateList />} />

          <Route path="/playdate/:playdateId" element={<PlaydateDetail />} />
          <Route path="/playdate/edit/:playdateId" element={<EditPlaydate />} />
          <Route path="/newPlaydate" element={<NewPlaydate />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
