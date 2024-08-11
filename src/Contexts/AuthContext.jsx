import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const Fake_User = {
  name: "Mahdi",
  email: "mahdi@gmail.com",
  password: "1234",
};

const Initial_State = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      return "Unknown action";
  }
}

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    Initial_State
  );

  function login(email, password) {
    if (Fake_User.email === email && Fake_User.password === password) {
      dispatch({ type: "login", payload: Fake_User });
    } else {
      toast.error("Email or Password is incorrect.");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider.");
  return context;
};
