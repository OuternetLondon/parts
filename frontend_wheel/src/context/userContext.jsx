import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const newId = uuidv4();
        setUser(newId);
        localStorage.setItem("user", JSON.stringify(newId));
      }
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};