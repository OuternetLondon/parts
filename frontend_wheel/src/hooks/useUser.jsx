import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function useUser() {
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

  return user;
}

export default useUser;