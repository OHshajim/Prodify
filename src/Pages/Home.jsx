import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/UseAxios";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Home = () => {
  const { register, handleSubmit } = useForm();
  let search = " ";
  const [sort, setSort] = useState("");
  const {
    data: cards = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/products?search=${search}&&sortBy=${sort}`
      );
      return res.data;
    },
  });
  const handleSearch = (data) => {
    search = data.search;
    if (search === "") {
      return refetch();
    }
    refetch();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="join flex justify-center">
          <input
            {...register("search")}
            name="search"
            type="text"
            placeholder="Search products"
            className="input input-bordered join-item rounded-full"
          />
          <button
            type="submit"
            className="btn text-white bg-cyan-500 join-item rounded-full"
          >
            Search
          </button>
        </div>
      </form>

      <h1 className="text-center font-semibold text-2xl my-10">Products</h1>

      <div>
        {loading ? (
          <></>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {cards.map((card) => (
              <div className="flex justify-center items-center">
                <Card key={card._id} card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
