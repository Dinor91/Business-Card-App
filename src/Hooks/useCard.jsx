import {useEffect, useState} from "react";
import cardService from "../Services/cardService";

export const useCard = (id) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const getCard = async () => {
      const {data} = await cardService.getCard(id);

      setCard(data);
    };

    getCard();
  }, []);

  return card;
};
