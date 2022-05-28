import { createContext, useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("user info"));
        if (userInfo) {
            setUser(userInfo);
            // console.log(user)
        }
        else{
            console.log("No user found")
        }
    }, [])
    

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
};



export default UserProvider ;