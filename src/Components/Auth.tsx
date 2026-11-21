import { Navigate } from "react-router";



function Auth({ children, NoLogin = false }) {
    const token = localStorage.getItem("accessToken");

    if (NoLogin && token) {
        return <Navigate to="/" replace />;
    }

    if (!NoLogin && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default Auth;