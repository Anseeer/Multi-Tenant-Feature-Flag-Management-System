import { useEffect } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useDispatch } from 'react-redux';
import axiosInstance from './api/axios';
import { fetchUser } from './api/user.service';
import { setUser } from './slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from './slices/AdminSlice';
import { setSuperAdmin } from './slices/SuperAdminSlice';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me", { withCredentials: true, });
        console.log("res :", response.data)
        const id = response.data.data.id;
        const role = response.data.data.role;
        console.log("Role :", role)
        if (role == "user" || role == "admin") {
          const user = await fetchUser(id);
          console.log(user.data)
          if (role == "user") {
            dispatch(
              setUser({
                id: user.data._id,
                name: user.data.name,
                email: user.data.email,
                orgId: user.data.orgId,
                isAuthenticated: true,
              })
            );
            navigate('/')
          } else if (role == "admin") {
            dispatch(
              setAdmin({
                id: user.data._id,
                name: user.data.name,
                email: user.data.email,
                orgId: user.data.orgId,
                isAuthenticated: true,
              })
            );
            navigate('/admin')
          }
        } else {
          const data = response.data.data;
          console.log(data)
          dispatch(
            setSuperAdmin({
              email: data.email,
              isAuthenticated: true,
            })
          );
          navigate('/super-admin/dashboard')
        }

      } catch (error) {
        console.log(
          "Not authenticated", error
        );
      }
    };

    restoreUser();
  }, []);


  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
