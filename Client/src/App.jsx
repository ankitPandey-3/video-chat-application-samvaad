import axios from "axios";
import { Outlet } from "react-router-dom";

function App() {
  axios.defaults.baseURL = "https://video-chat-application-mern.onrender.com";
  // axios.defaults.baseURL = "http://localhost:4040"
  axios.defaults.withCredentials = true;

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
