import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Context/auth.context";
import {toast} from "react-toastify";

const LogOut = ({redirect}) => {
  const {logout} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    logout();

    toast("You are currently logged out! ", {
      position: "bottom-left",
    });

    if (redirect) {
      navigate(redirect);
    }
  }, [logout, navigate]);

  return null;
};
export default LogOut;
