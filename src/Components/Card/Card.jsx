import "../styles/Card.css";

const Card = ({ title, desc, icon, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      
      <div className="card-icon">{icon}</div>

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-desc">{desc}</p>
      </div>

    </div>
  );
};

export default Card;