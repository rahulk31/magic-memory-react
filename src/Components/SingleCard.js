import "./singleCard.css";

const SingleCard = ({ card, setChoice, flipped, disabled }) => {
  const clickHandler = () => {
    if (!disabled) {
      setChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="ima" />
        <img
          className="back"
          src="/img/cover.png"
          alt="back cover"
          onClick={clickHandler}
        />
      </div>
    </div>
  );
};

export default SingleCard;
