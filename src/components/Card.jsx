import propTypes from "prop-types";
import "../style/Card.css";
import { useRef } from "react";
import { useEffect } from "react";
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
  const img = useRef(null);
  const card = useRef(null);

  // Show image when loaded
  useEffect(() => {
    function loaded() {
      card.current.classList.add("loaded");
    }
    if (img.current.complete) {
      loaded();
    } else {
      img.current.addEventListener("load", loaded);
    }
    return () => {};
  }, []);

  return (
    <div className="card" ref={card} onClick={() => props.onClick(props.index)}>
      <img ref={img} src={props.data.image} alt={props.data.name} />
    </div>
  );
}
Card.propTypes = {
  onClick: propTypes.func,
  index: propTypes.number,
  data: propTypes.object,
};
