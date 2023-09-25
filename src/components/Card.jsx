import propTypes from "prop-types";
import "../style/Card.css";
/**
 * Render a card component.
 *
 * @param {Object} props - The props passed to the component.
 * @param {number} props.index - The index of the card.
 * @param {Object} props.data - The data object containing the image and name.
 * @param {string} props.data.image - The URL of the image.
 * @param {string} props.data.name - The name of the card.
 * @param {Function} props.onClick - The onClick event handler.
 * @returns {JSX.Element} - The rendered card component.
 */
export default function Card(props) {
  return (
    <div className="card" onClick={() => props.onClick(props.index)}>
      <img src={props.data.image} alt={props.data.name} />
    </div>
  );
}
Card.propTypes = {
  onClick: propTypes.func,
  index: propTypes.number,
  data: propTypes.object,
};
