import React, {useState} from "react";
import {useUserDispatch} from "../store/UserContext";
export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userDispatch = useUserDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userDispatch({
      type: "LOGIN",
      payload: {username: username, password: password},
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="email"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            type="submit"
            className={"py-2 rounded-md bg-black text-white"}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
