import React, { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLodding] = useState(true)

    const chechAuth = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            setUser(null)

            throw new Error(error.response?.data?.message || "Error from checkAuth")

        } finally {
            setIsLodding(false)
        }
    }

    useEffect(() => {
        chechAuth()
    }, [])


    const signup = async (username, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", { username, email, password }, { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Unknown error');
        }
    }

    const login = async (email, password) => {
        try {
            await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true })
            const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true })
            setUser(res.data)
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Unknown error');
        }

    }

    const logout = async () => {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signup, login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}