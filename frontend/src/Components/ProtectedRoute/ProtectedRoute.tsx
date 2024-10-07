import React from 'react';
import { Navigate} from 'react-router-dom';
import { useUser } from '../../Context/Context';


interface ProtectedRouteProps {
  role?: string;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children}) => {
  const {user} = useUser();

  if (user.role === "guest") {
    return <Navigate to="/auth/login" />;

  }else{
    if (role !== user.role) {
        if ( user.role === "user"){
            return <Navigate to="/user" />;
        }
        if ( user.role === "admin"){
            return <Navigate to="/admin" />;
        }
        else{
            return <Navigate to="/auth/login" />;
        }
    }else{
        return <>{children}</>;
    }
  }

};

