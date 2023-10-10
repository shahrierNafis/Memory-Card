import PropTypes from "prop-types";
import "../style/ScoreBoard.css";
/**
 * Renders the scoreboard component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.trigger - Determines if the scoreboard should be displayed.
 * @param {string} props.message - The message to be displayed in the scoreboard.
 * @param {number} props.current - The current score.
 * @param {number} props.highest - The highest score.
 * @param {function} props.reset - The function to be called when the start button is clicked.
 * @returns {JSX.Element} - The rendered scoreboard component.
 */
export default function ScoreBoard(props) {
  return props.trigger ? (
    <div className="scoreBoard">
      <div className="message">{props.message}</div>
      {/* Only show scores when not zero */}
      {props.current !== 0 ? (
        <div className="scores">
          <div className="score">
            <div>Score</div>
            <div>{props.current}</div>
          </div>
          <div className="score">
            <div>High Score</div>
            <div>{props.highScore}</div>
          </div>
        </div>
      ) : (
        <div className="how-to-play">
          This is a simple memory game built with React. The objective of the
          game is to pick cards without picking the same card twice. The game
          keeps track of the current score and the high score.
        </div>
      )}
      <button className="start-btn" onClick={props.reset}>
        <div>Start</div>
      </button>
    </div>
  ) : (
    ""
  );
}
ScoreBoard.propTypes = {
  trigger: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  current: PropTypes.number,
  highScore: PropTypes.number,
};
