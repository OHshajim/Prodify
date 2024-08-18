import { TiStarFullOutline } from "react-icons/ti";

const Card = ({ card }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={card?.image} alt={card?.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{card?.name}</h2>
          <p>{card?.description}?</p>
          <div className="card-actions justify-center">
            <div className="badge badge-outline  text-blue-500">{card?.category}</div>
            <div className="badge badge-outline text-blue-500">{card?.brand}</div>
            <div className="badge badge-outline gap-1 text-yellow-400">{card?.ratings} <TiStarFullOutline /></div>
            <div className="badge badge-outline text-green-500">{card?.price} $$</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
