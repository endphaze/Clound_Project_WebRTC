import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('token'); // ตรวจสอบว่ามี Token หรือไม่

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
