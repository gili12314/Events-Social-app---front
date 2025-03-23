import { useEffect, useState } from "react";
import { IUser } from "../types";
import React from "react";
import * as AuthService from '../services/auth.service'
export interface IAuthContext {
    user: IUser | null;
    loading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<IUser>;
    register: (username: string, email: string, password: string) => Promise<{token: string}>;
    logout: () => void;
}


const AuthContext = React.createContext<IAuthContext | null>(null)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)

    // effect that fetches user data when token changes
    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const response = await AuthService.me()
                    setUser(response)
                } catch (error) { 
                    console.error("Failed to fetch user data:", error)  
                }
                finally {
                    setLoading(false)
                }
            })()
        }
        else {
            setLoading(false)
        }
    },[token]);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)
            const user = await AuthService.login(email, password)
            if(!user.token) {
                throw new Error("No token in response")
            }
            setToken(user.token)
            setUser(user)
            localStorage.setItem("token", user.token)
            return user
        }
        catch(e) {
            console.error("Failed to login:", e)
            throw e
        }
        finally {
            setLoading(false)
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            setLoading(true)
            const response = await AuthService.register(username, email, password)
            setToken(response.token)
            localStorage.setItem("token", response.token)
            return response
        }
        catch(e) {
            console.error("Failed to register:", e)
            throw e
        }
        finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }
    return context
}