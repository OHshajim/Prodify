import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/UseAxios";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
const Home = () => {
  const { register, handleSubmit } = useForm();
  let Sort = "",
    search = " ";
  const [Category, setCategory] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");
  const [Brand, setBrand] = useState("");

  // pagination
  const [count, setCount] = useState(null);
  useEffect(() => {
    const TotalProducts = async () => {
      await axios.get("http://localhost:5000/totalProducts").then((res) => {
        // console.log(res.data);
        setCount(res.data);
      });
    };
    TotalProducts();
  }, [count]);

  const [currentPage, setPage] = useState(0);
  const itemPerPage = 10;
  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const {
    data: cards = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: [
      "cards",
      Sort,
      search,
      Category,
      MinPrice,
      MaxPrice,
      Brand,
      currentPage,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/products?search=${search}&&sortBy=${Sort}&&Brand=${Brand}&&Category=${Category}&&MinPrice=${MinPrice}&&MaxPrice=${MaxPrice}&&page=${currentPage}`
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
  // category
  const handleBrand = (e) => {
    const brand = e.target.value;
    if (brand == 0) return;
    setBrand(brand);
    console.log(brand);
    refetch();
  };
  const handleCategory = (e) => {
    const category = e.target.value;
    if (category == 0) return;
    setCategory(category);
    console.log(category);
    refetch();
  };
  const handleMinPriceRange = (e) => {
    const minPrice = e.target.value;
    if (minPrice == 0) return;
    setMinPrice(minPrice);
    console.log(MinPrice);
    refetch();
  };
  const handleMaxPriceRange = (e) => {
    const maxPrice = e.target.value;
    if (maxPrice == 0) return;
    setMaxPrice(maxPrice);
    console.log(MaxPrice);
    refetch();
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setPage(currentPage + 1);
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-20">
      <div className="flex justify-between my-5 ">
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
          className="select select-bordered w-full max-w-xs rounded-full"
        >
          <option disabled selected value={0}>
            Sort by
          </option>
          <option value={"price:-1"}>Price : Hight to Low</option>
          <option value={"price:1"}>Price : Low to Hight</option>
          <option value={"date"}>Date</option>
        </select>
      </div>

      {/* category */}
      <div className="flex justify-between my-5">
        <div className="mb-4">
          <select
            className="select select-bordered w-full max-w-xs rounded-full"
            onChange={handleBrand}
          >
            <option selected disabled value={0}>
              Brand
            </option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Royal Enfield">Royal Enfield</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            className="select select-bordered w-full max-w-xs rounded-full"
            onChange={handleCategory}
          >
            <option selected disabled value={0}>
              Category
            </option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Shoes">Shoes</option>
            <option value="Pants">Pants</option>
            <option value="Bikes">Bikes</option>
          </select>
        </div>
        {/* Price Range */}
        <div className="mb-4 flex  gap-4">
          <input
            type="number"
            name="MinPrice"
            className="input input-bordered w-full max-w-xs rounded-full"
            placeholder="Min Price"
            min={10}
            onChange={handleMinPriceRange}
          />
          <input
            type="number"
            name="MaxPrice"
            className="input input-bordered w-full max-w-xs rounded-full"
            placeholder="Max Price"
            min={10}
            onChange={handleMaxPriceRange}
          />
        </div>
      </div>
      <h1 className="text-center font-semibold text-2xl my-10">Products</h1>

      <div>
        {loading ? (
          <></>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card._id} className="flex justify-center items-center">
                <Card card={card} />
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default Home;
