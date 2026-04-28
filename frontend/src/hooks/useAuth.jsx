import { createContext, useContext, useState } from "react";
import { login as apiLogin, logout as apiLogout } from '../api/auth.js';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return { id: payload.sub };
        } catch { return null; }
    });

    const login = async (username, password) => {
        await apiLogin(username, password);
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.sub });
    };

    const logout = () => { apiLogout(); setUser(null); };

    return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);