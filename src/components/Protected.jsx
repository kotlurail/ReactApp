import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate,Link } from "react-router-dom";
import authSlice from '../redux/slices/authSlice';
// import { selectLoggedInUser } from '../authSlice';

const  Protected=({ children })=> {
  const user = useSelector((state) => state.auth.loggedIn);

  const Navigate=useNavigate();
  useEffect(() => {
    if (!user) {
      Navigate('/', { replace: true });
    }
  }, [user, Navigate]);

  return user ? children : null;
}

export default Protected;
