import "./App.css";
import HomePage from "./Components/Home/HomePage";
import Profile from "./Components/Profile/Profile";
import Follow from "./Components/Follow/Follow";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Chat from "./Components/Chat/Chat";
import Group from "./Components/Group/Group";
import ProfileUser from "./Components/ProfileUser/ProfileUser";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/group" element={<Group />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile_user" element={<ProfileUser />} />
          <Route path="/followers" element={<Follow />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
