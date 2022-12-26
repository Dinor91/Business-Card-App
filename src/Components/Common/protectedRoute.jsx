import {Navigate} from "react-router-dom";
import {useAuth} from "../../Context/auth.context";

const ProtectedRoute = ({children, onlyBiz = false}) => {
  const {user} = useAuth();

  //if (!user|| (onlyBiz && !user.biz)){  return <Navigate to="/sign-in" />;}

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (onlyBiz && !user.biz) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};
export default ProtectedRoute;

//!A children is anything that will be found between this component

//!if the user is unconnected <Navigate/> will active. if the user is connect make a second check: if onlyBiz is true make sure that user.biz isn't false, if it is active <Navigate/>
