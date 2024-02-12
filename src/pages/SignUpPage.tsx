import React, {useState} from "react";
import UserService from "../services/user.service";
import {User, Role, Faculty} from "../types";
/**
 * 
 * @deprecated
 */
function SignUpPage() {
  // const [message, setMessage] = useState<string | null>(null);
  // const userService = new UserService();
  // const [formData, setFormData] = useState({
  //   // authcate: "",
  //   email: "",
  //   lastName: "",
  //   firstName: "",
  //   role: "Student",
  //   password: "",
  //   faculty: "",
  // });

  // const handleChange = (e: {target: {name: any; value: any}}) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // /**
  //  * 
  //  * @deprecated
  //  */
  // const handleSubmit = (e: {preventDefault: () => void}) => {
  //   e.preventDefault();

  //   const user: User = {
  //     ...formData,
  //     monashObjectId: "",
  //     authcate: formData.email.split("@")[0],
  //     role: formData.role as Role,
  //   };

  //   userService
  //     .register(user)
  //     .then((res) => {
  //       setMessage("User registered successfully");
  //       window.location.href = "/login";
  //     })
  //     .catch((err) => {
  //       setMessage("Unable to register user please try again");
  //     });
  // };
  // const faculty: Faculty[] = [
  //   "Arts",
  //   "Art, Design and Architecture",
  //   "Business and Economics",
  //   "Education",
  //   "Engineering",
  //   "Information Technology",
  //   "Law",
  //   "Medicine, Nursing and Health Sciences",
  //   "Pharmacy and Pharmaceutical Sciences",
  //   "Science",
  // ];
  // return (
  //   <div className="flex flex-col items-center ">
  //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
  //       .<h1 className="text-4xl font-bold mb-8">Sign Up</h1>
  //       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
  //         <label>Email:</label>

  //         <input
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           placeholder="Email"
  //         />

  //         <label>First Name:</label>

  //         <input
  //           type="text"
  //           name="firstName"
  //           value={formData.firstName}
  //           onChange={handleChange}
  //           placeholder="First Name"
  //         />
  //         <label>Last Name:</label>

  //         <input
  //           type="text"
  //           name="lastName"
  //           value={formData.lastName}
  //           onChange={handleChange}
  //           placeholder="Last Name"
  //         />
  //         <label>Role:</label>

  //         <select name="role" value={formData.role} onChange={handleChange}>
  //           <option value="Student">Student</option>
  //           <option value="Tutor">Tutor</option>
  //           <option value="CE">CE</option>
  //         </select>
  //         <label>Password: </label>

  //         <input
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           placeholder="Password"
  //         />
  //         <label>Faculty:</label>

  //         <select
  //           name="faculty"
  //           value={formData.faculty}
  //           onChange={handleChange}
  //         >
  //           <option value="" disabled selected>
  //             Select your faculty
  //           </option>
  //           {faculty.map((f) => (
  //             <option key={f} value={f}>
  //               {f}
  //             </option>
  //           ))}
  //         </select>
  //         <button
  //           type="submit"
  //           className={`col-span-2 py-2 rounded-md ${"bg-gray-500 text-white hover:bg-black"}`}
  //         >
  //           Sign Up
  //         </button>
  //       </form>
  //       {message && (
  //         <div className="mt-4 w-full text-center py-2 ">{message}</div>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default SignUpPage;
