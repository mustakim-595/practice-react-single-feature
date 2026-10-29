
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      alert("Registration successful!");

      navigate("/login");

    } catch (error) {
      console.error("Error during registration: ", error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-gray-500 shadow-xl shadow-slate-200/60 sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your account and start your journey.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>


          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500 transition hover:text-cyan-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex justify-between gap-3 items-center">
            <button
              onClick={() => navigate("/")}
              type="button"
              className="w-full cursor-pointer rounded-xl border border-red-500 px-4 py-3.5 font-semibold text-red-700 shadow-sm shadow-red-500/20 transition hover:border-red-600 active:scale-[0.98]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-2 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="cursor-pointer font-semibold text-cyan-600 transition hover:text-cyan-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
