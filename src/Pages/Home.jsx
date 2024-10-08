import Card from "../Components/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Loading from "../Components/Loading";
import { AuthContext } from "../Provider/AuthProvider";
const Home = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [Category, setCategory] = useState("");
  const [MinPrice, setMinPrice] = useState("");
  const [MaxPrice, setMaxPrice] = useState("");
  const [Brand, setBrand] = useState("");

  // pagination
  const [count, setCount] = useState(null);
  useEffect(() => {
    const TotalProducts = async () => {
      await axios
        .get("https://prodify-backend.vercel.app/totalProducts")
        .then((res) => {
          // console.log(res.data);
          setCount(res.data);
        });
    };
    TotalProducts();
  }, [user]);

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
      sort,
      search,
      Category,
      MinPrice,
      MaxPrice,
      Brand,
      currentPage,
      user,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `https://prodify-backend.vercel.app/products?search=${search}&&sortBy=${sort}&&Brand=${Brand}&&Category=${Category}&&MinPrice=${MinPrice}&&MaxPrice=${MaxPrice}&&page=${currentPage}`
      );
      return res.data;
    },
  });

  // search
  const handleSearch = (data) => {
    setSearch(data.search);
    refetch();
  };

  // sort
  const handleSort = (e) => {
    const Sort = e.target.value;
    if (Sort == 0) return;
    setSort(Sort);
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
    <div className="container mx-auto mt-10 mb-20 select-none">
      <div className="flex justify-between my-5 gap-5 sm:flex-row flex-col">
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
        <div className="flex justify-center">
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
      </div>

      {/* category */}
      <div className="grid md:grid-cols-3 w-full gap-4 md:my-5 my-1">
        <div className="sm:mb-4 mb-1 flex md:justify-start justify-center">
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
        <div className="sm:mb-4 mb-1 flex justify-center">
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
        <div className="sm:mb-4 mb-1 flex  gap-4">
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
      <h1 className="text-center font-semibold text-2xl my-4 sm:my-10">
        Products
      </h1>

      <div>
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : cards.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
            {cards.map((card) => (
              <div key={card._id} className="flex justify-center items-center">
                <Card card={card} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-error font-semibold text-xl">
            Products are not available !!!
          </p>
        )}
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between mt-16">
        <button
          onClick={handlePrev}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2   hover:bg-blue-100/60 hover:text-blue-500"
        >
          <FaArrowLeftLong />
          <span>previous</span>
        </button>
        <div className="items-center hidden lg:flex gap-x-3">
          {pages.map((page) => (
            <button
              onClick={() => setPage(page)}
              key={page}
              className={`px-2 py-1 text-sm  rounded-md   ${
                currentPage == page
                  ? "text-blue-500 bg-blue-100/60"
                  : "text-gray-500 bg-gray-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-blue-100/60 hover:text-blue-500"
        >
          Next
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default Home;
