"use client";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser, loading, setLoading } = useContext(AuthKanabanBoard);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const name = event.target.name.value;
    const password = event.target.password.value;
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/jwt",
        { email, name },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Login successful");
        setUser({ email, name });
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  // console.log(user, "user");

  return (
    <div className="lg:pt-[100px] pt-5">
      <div className="flex justify-center items-center">
        <div className="border-2 rounded-md border-[#e5e5e5] bg-white">
          <div className="md:px-[60px] px-[20px] pb-[20px] md:pb-14 ">
            <h1 className="text-center text-lg md:text-2xl my-4 md:my-10">
              LOGIN
            </h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-500">Username *</label>
                <br />
                <input
                  type="text"
                  name="name"
                  className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px] border-[#e5e5e5] outline-none rounded-none"
                />
              </div>
              <div>
                <label className="text-gray-500">Email address *</label>
                <br />
                <input
                  type="text"
                  name="email"
                  className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px] border-[#e5e5e5] outline-none rounded-none"
                />
              </div>
              <div className="relative">
                <label className="text-gray-500">Password *</label>
                <br />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="md:py-[10px] py-2 mt-2 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none border-[#e5e5e5] rounded-none"
                />
                {showPassword ? (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[45px] right-[10px] cursor-pointer"
                  >
                    <Eye size={20} className="text-gray-500" />
                  </span>
                ) : (
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[45px] right-[10px] cursor-pointer"
                  >
                    <EyeOff size={20} className="text-gray-500" />
                  </span>
                )}
              </div>
              {loading ? (
                <div className="bg-[#57c1ee] cursor-pointer w-full py-[10px] mt-4">
                  <h2 className="text-white flex items-center justify-center text-lg">
                    <Loader className="animate-spin" size={25} />
                  </h2>
                </div>
              ) : (
                <button className="bg-[#57c1ee] text-white cursor-pointer text-lg w-full py-[10px] mt-4">
                  Login
                </button>
              )}
            </form>
            <div>
              <h2 className="mt-4 text-gray-500">
                Do not Have An Account ?{" "}
                <Link href="/api/login" className="text-[#57c1ee]">
                  Register
                </Link>
              </h2>
            </div>
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                onClick={() => handleGoogleLogin("google")}
                className="flex px-4 py-2 justify-center cursor-pointer items-center gap-2 border-2 border-[#e5e5e5]"
              >
                <Image src="/google.png" alt="google" width={30} height={30} />
                Continue to Google
              </button>
              <button
                onClick={() => handleGithubLogin("github")}
                className="flex px-4 py-2 cursor-pointer justify-center items-center gap-2 border-2 border-[#e5e5e5]"
              >
                <Image src="/github.png" alt="google" width={30} height={30} />
                Continue to Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
