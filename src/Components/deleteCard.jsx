import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import cardService from "../Services/cardService";

//!this components will be similar to "logout" components. make delete card and take to back to "my-cards"
const DeleteCard = ({redirect}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const deleteCard = async () => {
      await cardService.deleteCard(id);

      toast("Your card has been successfully delete! 🗑️", {
        position: "bottom-left",
      });

      if (redirect) {
        navigate(redirect);
      }
    };

    deleteCard();
  }, []);

  return null;
};
export default DeleteCard;
