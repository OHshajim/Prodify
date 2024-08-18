import { GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
const GoogleProvider = new GoogleAuthProvider();

const Social = () => {
  const { loginWithG } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogle = () => {
    loginWithG(GoogleProvider)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          title: "Successfully logged in",
          text: "Thank you for login ",
          icon: "success",
          confirmButtonText: "close",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "close",
        });
      });
  };
  return (
    <div>
      <p className="text-center font-semibold">&& </p>
      <div className=" flex justify-center gap-5 pt-3 items-center">
        <button
          onClick={handleGoogle}
          className="btn btn-circle  text-3xl text-center"
        >
          <FcGoogle />
        </button>
      </div>
    </div>
  );
};

export default Social;
