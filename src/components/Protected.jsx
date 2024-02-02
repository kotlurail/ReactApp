import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.loggedIn);

  const Navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      Navigate("/", { replace: true });
    }
  }, [user, Navigate]);

  return user ? children : null;
};

export default Protected;
