import { useState, useRef, useEffect } from "react";
import data from "./data.js";
import Card from "./components/Card";
import ScoreBoard from "./components/ScoreBoard";
import "./App.css";
import { wrapGrid } from "animate-css-grid";

/**
 * Renders the main App component.
 *
 * @returns {ReactElement} The rendered App component.
 */
export default function App() {
  const [current, setCurrent] = useState(0); // current score
  const highest = useRef(0); // highest score
  const [picked, setPicked] = useState([]); // track picked cards
  const deck = useRef(shuffledDeck(handlePick)); // shuffled deck of cards
  const [showScoreBoard, setShowScoreBoard] = useState(true); // flag to show/hide score board
  let message = useRef("Don't pick twice"); // message to display

  if (localStorage.getItem("highest")) {
    highest.current = +localStorage.getItem("highest");
  } else {
    localStorage.setItem(highest, 0);
  }
  /**
   * Handles the pick of a card.
   *
   * @param {number} index - The index of the picked card.
   */
  function handlePick(index) {
    setPicked((picked) => [...picked, index]);
  }

  /**
   * Resets the game.
   */
  function reset() {
    setCurrent(() => 0); // set current score to zero
    setPicked([]); // unpick all cards
    setShowScoreBoard(false); // hide score board
  }

  useEffect(() => {
    // skip if nothing is picked
    if (picked.length) {
      // find duplicate pick
      const pickedTwice = picked.filter(
        (item, index) => picked.indexOf(item) !== index
      );
      // if the user picked twice
      if (pickedTwice.length > 0) {
        message.current = "You picked twice"; // change message
        setShowScoreBoard(true); // show score board
      } else if (picked.length == 12) {
        setCurrent((current) => (current += 1)); // increment current score
        message.current = "Winner"; // announce Winner
        setShowScoreBoard(true); // show score board
      } else {
        setCurrent((current) => (current += 1)); // increment current score
        deck.current = shuffledDeck(handlePick); // shuffle deck
      }
    }
  }, [picked]);

  useEffect(() => {
    // update highest if current score is higher
    if (current > highest.current) {
      highest.current = current;
      localStorage.setItem("highest", current);
    }
  }, [current]);
  // Add shuffle animation to deck on every render
  useEffect(() => {
    wrapGrid(document.getElementById("deck"));
  }, []);
  return (
    <>
      <ScoreBoard
        trigger={showScoreBoard}
        setTrigger={setShowScoreBoard}
        current={current}
        highest={highest.current}
        message={message.current}
        reset={reset}
      />
      <h1>{current}</h1>
      <div id="deck">{deck.current}</div>
    </>
  );
}

/**
 * Generates an array of cards in random order.
 *
 * @param {function} handlePick - The callback function to handle card click events.
 * @returns {Array} The array of shuffled cards.
 */
function shuffledDeck(handlePick) {
  // Track taken cards
  const taken = [];

  // The deck of cards
  const deck = [];

  // While there are cards left to pick
  while (taken.length !== data.length) {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * data.length);

    // If the card has not been taken
    if (!taken.includes(randomIndex)) {
      // Mark the card as taken
      taken.push(randomIndex);

      // Create a card element and add it to the deck
      deck.push(
        <Card
          key={randomIndex}
          index={randomIndex}
          data={data[randomIndex]}
          onClick={handlePick}
        />
      );
    }
  }

  // Return the deck of shuffled cards
  return deck;
}
