# Memory Game

This is a simple memory game built with React. The objective of the game is to pick cards without picking the same card twice. The game keeps track of the current score and the highest score.

## Prerequisites

To run this project, you will need to have Node.js and npm installed on your system. You can download Node.js from the official website.

## Setup

To set up the project, clone the repository to your local machine and install the dependencies by running the following command in your terminal:

```
git clone https://github.com/your-username/memory-game.git
cd memory-game
npm install
npm run dev
```

The development server will run on port 5173. You can open the CV form in your browser by visiting <http://localhost:5173>.

## Code Explanation

The code for this project is located in the `src` directory. The main component of the game is the `App.jsx` file. Let's go through the code step by step to understand how it works:

### App.jsx

The `App.jsx` file is the main component of the game. It imports the necessary React hooks and components, and defines the main functionality of the game.

```javascript
import { useState, useRef, useEffect } from "react";
import data from "./data.json";
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
    localStorage.setItem(highest, 

Generated by [BlackboxAI](https://www.useblackbox.ai)
