import Card from "../Components/Card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";

const Home = () => {
  const { data: cards = [], isPending: loading } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axios.get(`/data.json`);
      console.log(res);
      return res.data;
    },
  });
  console.log(cards);

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-10">Products</h1>
      <div>
        {loading ? (
          <></>
        ) : (
          <div className="grid grid-cols-3 ">
            {cards.map((card) => (
              <div className="flex justify-center items-center">
                <Card key={card.name} card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
