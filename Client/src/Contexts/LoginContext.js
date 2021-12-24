import React, { useState} from "react"
export const LoginContext = React.createContext();

export const LoginProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId , setUserId] = useState("");
  const loginI = (userId) =>
  { 
      setLoggedIn(true);
      setUserId(userId);
  }
  const logoutI = () =>
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
  