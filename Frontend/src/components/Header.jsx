import { NavLink, Link } from "react-router-dom";
function Header() {
  return (
    <div className="bg-inkporaPink h-18 w-full flex row items-center justify-between">
      <Link to={"/"}>
        <img src="/assets/image.png" className="h-30 w-30 cursor-pointer" />
      </Link>
      <div>
        {" "}
        <form action="">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search products"
            className="border rounded-2xl p-1.5 m-1.5 focus-outline-red"
          />
          <button
            onClick={(event) => {
              event.preventDefault();
            }}
            className="h-9 w-9"
          >
            <img
              src="/assets/search.png"
              alt="search"
              className="mt-2.5 cursor-pointer"
            />
          </button>
        </form>
      </div>
      <div className="pr-2">
        <NavLink to={"/signup"}>Signup</NavLink>
        &nbsp;/&nbsp;
        <NavLink to={"/login"}>Login</NavLink>
      </div>
    </div>
  );
}

export default Header;
