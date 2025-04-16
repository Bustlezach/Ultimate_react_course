import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import api from "./api";
import "./App.css";

function App() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [protectedData, setProtectedData] = useState(null);

  async function fetchProtectedData() {
    try {
      const res = await api.get("api/protected");
      setProtectedData(res.data);
    } catch (err) {
      console.error("Failed to fetch protected data:", err);
    }
  }

  useEffect(() => {
    console.log(accessToken);
    if (accessToken) {
      fetchProtectedData();
    }
  }, [accessToken]);

  return (
    <div className="App">
      <h1>FullStack Authentication</h1>
      {!user ? (
        <>
          <h2>Login</h2>
          <LoginPage />
        </>
      ) : (
        <div>
          <h2>Dashboard</h2>
          <p>Welcome, {user?.user?.email}</p>
          <p>Protected message: {protectedData}</p>
        </div>
      )}
    </div>
  );
}

export default App;
