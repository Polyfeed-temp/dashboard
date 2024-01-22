import axios from "axios";
import React, {useState, FormEventHandler} from "react";

function LoginPopup({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    const res = await fetch("http://localhost:8000/api/login/token", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.status === 200) {
      res.json().then((data) => {
        localStorage.setItem("token", data.access_token);
      });
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <form onSubmit={handleSubmit}>
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Login
            </h3>
            <div className="mt-2 px-7 py-3">
              <input
                type="text"
                className="mb-3 px-3 py-2 border rounded-md w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="password"
                className="px-3 py-2 border rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="items-center px-4 py-3"></div>
      </div>
    </div>
  );
}

export default LoginPopup;
