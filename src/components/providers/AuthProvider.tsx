"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    username: string;
    name: string;
    email?: string;
    token: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User, remember?: boolean) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for saved user in localStorage or sessionStorage on mount
        const savedUserLocal = localStorage.getItem("sof_user");
        const savedUserSession = sessionStorage.getItem("sof_user");

        const savedUser = savedUserLocal || savedUserSession;

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
                localStorage.removeItem("sof_user");
                sessionStorage.removeItem("sof_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, remember: boolean = true) => {
        setUser(userData);
        if (remember) {
            localStorage.setItem("sof_user", JSON.stringify(userData));
            sessionStorage.removeItem("sof_user"); // Ensure it's not in session if remembered
        } else {
            sessionStorage.setItem("sof_user", JSON.stringify(userData));
            localStorage.removeItem("sof_user"); // Ensure it's not in local if not remembered
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("sof_user");
        sessionStorage.removeItem("sof_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
