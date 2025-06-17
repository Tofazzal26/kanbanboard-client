"use client";
import { AuthKanabanBoard } from "@/KanabanProvider/KanabanProvider";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const Header = () => {
  const { user, setUser, loading } = useContext(AuthKanabanBoard);
  const path = usePathname();
  // is a user logout function
  const handleLogout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <div className="howCardShadow bg-white">
      <div className="container mx-auto py-2 lg:px-0 px-2 lg:py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <button className="flex items-center gap-1 text-[20px] cursor-pointer lg:text-[25px]">
                <Image
                  className="lg:w-[35px] lg:h-[35px] w-[30px] h-[30px]"
                  src="/dashboard.png"
                  width={65}
                  height={65}
                  alt="logo"
                />
                <h2 className="mt-[3px]">Kanaban Board</h2>
              </button>
            </Link>
          </div>
          <div className="text-lg space-x-2 lg:space-x-4">
            <Link href="/" className={path === "/" ? "text-[#57c1ee]" : ""}>
              Home
            </Link>

            <Link
              href="/api/contact"
              className={path === "/api/contact" ? "text-[#57c1ee]" : ""}
            >
              Contact
            </Link>
          </div>
          <div>
            <div>
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <Image
                        src={"/user4.png"}
                        width={40}
                        height={40}
                        alt="profile"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a>{user?.name}</a>
                    </li>
                    <li>
                      <a>{user?.email}</a>
                    </li>
                    <li>
                      <Link href="/api/my-profile">My Profile</Link>
                    </li>
                    <li>
                      <a>
                        <button onClick={handleLogout} className="text-red-500">
                          Logout
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/api/login">
                  <button className="rounded-md bg-[#57c1ee] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
