import "./App.css";

import { useState, useEffect, useRef } from "react";
import SingleCard from "./Components/SingleCard";

import Confetti from "react-confetti";

const cardsDB = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [confetti, setConfetti] = useState(12);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const confettiRef = useRef(null);

  //? shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsDB, ...cardsDB]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    console.log(cards);
  };

  useEffect(() => {
    //? Confetti height and width
    setWidth(confettiRef.current.clientWidth);
    setHeight(confettiRef.current.clientHeight);

    //? Shuffling cards
    shuffleCards();
  }, []);

  const newGameHandler = () => {
    shuffleCards();
    setTurns(0);
    setConfetti(12);
  };

  const setChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turns) => turns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setConfetti((confetti) => confetti - 2);

        console.log(confetti);

        setCards((previousCards) =>
          previousCards.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : card;
          })
        );
        reset();
      } else {
        setTimeout(reset, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      <div ref={confettiRef} className="main-page">
        {confetti === 0 ? <Confetti width={width} height={height} /> : null}
        <div className="App">
          <h1>Magic Match</h1>
          <button onClick={newGameHandler}>New Game</button>

          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                setChoice={setChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>

          <p>Turns: {turns}</p>
        </div>
      </div>
    </>
  );
}

export default App;
