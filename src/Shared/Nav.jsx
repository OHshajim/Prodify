import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Nav = () => {
  const { user, Logout } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Prodify</a>
      </div>
      <div className="flex-none gap-5">
        <div className="navbar-end">
          {user ? (
            <button
              onClick={() => Logout()}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
          ) : (
            <a
              className="btn btn-outline border-cyan-500 text-cyan-500"
              href="/login"
            >
              Login
            </a>
          )}
        </div>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
