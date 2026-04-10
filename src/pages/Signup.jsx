import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-bl from-[#FDE68A] via-white to-[#2F5D56] overflow-x-hidden">
      <h1 className="text-4xl text-[#2e5b4e] mb-6 text-center" style={{ fontFamily: "'Bowlby One', cursive" }}>
        Welcome!
      </h1>
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl w-[360px] max-w-[90%] shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:border-[#2e5b4e]"
          />

          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="email@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:border-[#2e5b4e]"
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:border-[#2e5b4e]"
          />

          <button className="mt-2 p-3 rounded-xl bg-[#2e5b4e] text-white text-base cursor-pointer hover:bg-[#1f4036] transition w-full">
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 bg-white cursor-pointer hover:bg-gray-50 transition w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="#" className="text-[#2e5b4e] no-underline hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;