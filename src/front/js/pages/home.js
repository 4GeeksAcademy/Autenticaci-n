import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <Link to={"/Signup"}>
        <button className="m-2">Registro</button>
      </Link>
      <Link to={"/login"}>
        <button className="m-2">Login</button>
      </Link>
      <button className="m-2" onClick={() => actions.logout()}>LogOut</button>
      <Link to={"/private"}>
        <button className="m-2">Ruta privada</button>
      </Link>
    </div>
  );
};
