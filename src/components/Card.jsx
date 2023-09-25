import "./Card.css";
export default function Card(props) {
  return (
    <div className="card" onClick={() => props.onClick(props.index)}>
      <img src={props.data.image} alt={props.data.name} />
    </div>
  );
}
