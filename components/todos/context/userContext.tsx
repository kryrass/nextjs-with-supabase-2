"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";

interface User {
    id: string;
    name: string;
}

const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.from("users").select("*").single();
            if (error) {
                console.error("Error fetching user:", error);
                return;
            }
            setUser(data);
        };

        fetchUser();
    }, [supabase]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
