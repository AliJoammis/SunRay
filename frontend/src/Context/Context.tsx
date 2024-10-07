import React, { createContext, useContext, useState, ReactNode} from 'react';
import { UserType } from '../Models/UserModel';



// Define a type for the context value
interface UserContextType {
    user: UserType;
    login: (userData: UserType) => void;
    logout: () => void;
  }
  
  const initialUser: UserType= {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'guest'
} 
  
  // Create the context
  const UserContext = createContext<UserContextType>({
    user: initialUser,
    login: () => {},
    logout: () =>{}
  });


export const UserProvider: React.FC<{children:ReactNode}>  = ({ children }) => {

    const [user, setUser] = useState<UserType>(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : initialUser;
    });
        
    const login = (userData:UserType) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }
    
    const logout = () => {
        setUser(initialUser);
        localStorage.removeItem('user');
        
        // Remove the token from localStorage
        const token = localStorage.getItem('token');
        if (token){
          localStorage.removeItem('token');
        };
      }
   
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };

