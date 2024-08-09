import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus(null);
    try {
      const response = await actions.loginUser(formData);
      if (response.token) {
        navigate("/private");
      } else {
        setLoginStatus(
          response.msg === "No existe el usuario"
            ? "Usuario no encontrado"
            : "Error al acceder a la web"
        );
      }
    } catch (error) {
      setLoginStatus("Email o Contraseña incorrectos");
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-7">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Iniciar sesión
        </h1>
        <button className="text-black hover:text-gray-700 "></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-black dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-abitacoloDarkGrayShadow dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-abitacoloDarkGrayShadow dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full text-black bg-abitacoloGreen hover:ring-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-xl px-5 py-2.5"
        >
          Entrar en la cuenta
        </button>
        {loginStatus && (
          <p
            className={
              loginStatus === "Login correcto"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {loginStatus}
          </p>
        )}
        <div className="flex justify-between">
          <p className="font-light text-abitacoloDarkGrayShadow dark:text-abitacoloGray">
            Aún no tienes cuenta?{" "}
          </p>
          <Link to={"/SignUp"}>
            <button className="font-medium text-abitacoloDarkGrayShadow hover:underline dark:text-abitacoloGreen">
              Registrate
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
