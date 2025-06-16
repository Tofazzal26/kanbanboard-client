"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthKanabanBoard = createContext();

import React from "react";

const KanabanProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/userInfo", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.warn("Unauthorized. Logging out...");
        } else {
          console.error("User fetch error:", err.message);
        }
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const allData = { user, setUser, loading, setLoading };
  return (
    <AuthKanabanBoard.Provider value={allData}>
      {children}
    </AuthKanabanBoard.Provider>
  );
};

export default KanabanProvider;
