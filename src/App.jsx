import { useState, useRef, useEffect } from "react";
import data from "./data.json";
import Card from "./components/Card";
import "./App.css";

function App() {
  const current = useRef(0);
  const highest = useRef(0);
  const [picked, setPicked] = useState([]);

  function handlePick(index) {
    setPicked((picked) => [...picked, index]);
  }

  useEffect(() => {
    if (picked.length === 0) {
      console.log(picked);
      alert("don't pick twice");
    } else {
      // check if the used picked twice
      const pickedTwice = picked.filter(
        (item, index) => picked.indexOf(item) !== index
      );
      if (pickedTwice.length > 0) {
        current.current = 0;
        setPicked([]);
      } else {
        current.current += 1;
        if (current.current > highest.current) {
          highest.current = current.current;
        }
      }
    }
  }, [picked.length]);
  /**
   * Returns an array of cards in random order.
   * @returns {Array} The array of shuffled cards.
   */
  function shuffledDeck() {
    // Track taken cards
    const taken = [];

    const deck = [];

    // While cards are left in data
    while (taken.length !== data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);

      // If card is not taken
      if (!taken.includes(randomIndex)) {
        // Take the card
        taken.push(randomIndex);
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
    // return the deck
    return deck;
  }

  return <>{shuffledDeck()}</>;
}

export default App;
