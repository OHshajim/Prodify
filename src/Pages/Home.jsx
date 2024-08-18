import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/UseAxios";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
const Home = () => {
  const { register, handleSubmit } = useForm();
  let search = " ";
  let Sort = "";
  const {
    data: cards = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/products?search=${search}&&sortBy=${Sort}`
      );
      return res.data;
    },
  });

  // search
  const handleSearch = (data) => {
    search = data.search;
    if (search === "") {
      return refetch();
    }
    refetch();
  };

  // sort
  const handleSort = (e) => {
    const sort = e.target.value;
    if (sort == 0) return;
    Sort = sort;
    console.log(Sort);
    refetch();
  };
  return (
    <div>
      {/* search */}
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

      {/* sort */}
      <select
        onChange={handleSort}
        className="select select-bordered w-full max-w-xs"
      >
        <option disabled selected value={0}>
          Sort by
        </option>
        <option value={"price:-1"}>Price : Hight to Low</option>
        <option value={"price:1"}>Price : Low to Hight</option>
        <option value={"date"}>Date</option>
      </select>
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
