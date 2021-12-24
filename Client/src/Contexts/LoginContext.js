import React, { useContext, useState, useEffect } from "react"
const LoginContext = React.createContext();

export const LoginProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId , setUserId] = useState("");
  loginI = (userId) =>
  { 
      setLoggedIn(true);
      setUserId(userId);
  }
  logoutI = () =>
  {
      setLoggedIn(false);
      setUserId("");
  }
return (
        <LoginContext.Provider value={loggedIn , userId}>
          {children}
        </LoginContext.Provider>
      )
}
  