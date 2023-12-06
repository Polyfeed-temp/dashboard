import React, {useState} from "react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    // authcate: "",
    email: "",
    lastName: "",
    firstName: "",
    role: "Student",
    password: "",
    faculty: "Engineering",
  });

  const handleChange = (e: {target: {name: any; value: any}}) => {
    console.log(formData);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    console.log(formData);
    fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      mode: "no-cors",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        .<h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <label>First Name:</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <label>Last Name:</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <label>Role:</label>

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
            <option value="CE">CE</option>
          </select>
          <label>Password: </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <label>Faculty:</label>

          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
          >
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
          </select>
          <button
            type="submit"
            className={`col-span-2 py-2 rounded-md ${"bg-gray-500 text-white hover:bg-black"}`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
