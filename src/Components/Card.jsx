import "./FeatureCard.css";

const Card = ({ title, desc, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default Card;