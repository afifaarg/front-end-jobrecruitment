import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Landingpage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refresh");

    // Send request to blacklist the refresh token
    console.log(refreshToken);

    axios
      .post("http://127.0.0.1:8000/backendAPI/logout/", {
        refresh_token: refreshToken,
      })
      .then(() => {
        // Clear tokens from local storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        // Redirect to the home or login page
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <div>
      <h1>Your plane has successfully Landed!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
