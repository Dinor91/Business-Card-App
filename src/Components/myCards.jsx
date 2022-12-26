import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import cardService from "../Services/cardService";
import PageHeader from "./Common/pageHeader";
import Card from "./card";

const MyCards = ({redirect}) => {
  const [cards, setCards] = useState([]);

  //!this async fn is activate inside the useEffect because only after the first render we want that he will go to bring the rest cards and update the state

  useEffect(() => {
    const getCards = async () => {
      const {data} = await cardService.getAll();
      setCards(data);
    };

    getCards();
  }, []);

  return (
    <>
      <PageHeader
        title={<>My Cards</>}
        description="Here are all your business cards. You can create new cards or edit existing ones"
      />
      <div className="row">
        <Link to={redirect}>Create a New Card</Link>
      </div>

      <div className="row">
        {!cards.length ? (
          <p>No Cards</p>
        ) : (
          cards.map((card) => <Card key={card._id} card={card} />)
        )}
      </div>
    </>
  );
};

export default MyCards;
