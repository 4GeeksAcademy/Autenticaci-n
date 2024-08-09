import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const SignUp = () => {
  const { actions } = useContext(Context);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setPasswordMismatch(
      formData.password !== confirmPassword && confirmPassword !== ""
    );
  }, [formData.password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    setFormError("");

    const filledFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    try {
      await actions.registerUser(filledFormData);  // Asegúrate de que actions.registerUser devuelva una promesa
      navigate("/");
    } catch (error) {
      setFormError("Ocurrió un error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl text-center font-semibold">Regístrate</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {[
          {
            name: "email",
            type: "email",
            placeholder: "Correo electrónico",
            autoComplete: "email",
            required: true,
          },
          {
            name: "password",
            type: "password",
            placeholder: "Contraseña",
            autoComplete: "new-password",
            required: true,
          },
        ].map(({ name, type, placeholder, autoComplete, required }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {placeholder}
              <input
                id={name}
                onChange={handleChange}
                value={formData[name]}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                className="mt-1 block w-full border rounded-lg p-2.5 bg-gray-100"
                aria-describedby={`${name}-error`}
              />
            </label>
          </div>
        ))}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar contraseña
            <input
              id="confirmPassword"
              type="password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              autoComplete="new-password"
              required
              className="mt-1 block w-full border rounded-lg p-2.5 bg-gray-100"
              aria-describedby="confirmPassword-error"
            />
          </label>
          {passwordMismatch && (
            <p id="confirmPassword-error" className="text-red-500 font-bold mt-2">
              Las contraseñas no coinciden.
            </p>
          )}
        </div>
        {formError && (
          <p className="text-red-500 font-bold mt-2">{formError}</p>
        )}
        <div>
          <button
            type="submit"
            className="bg-green-500 w-full py-3 rounded-lg text-white focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          >
            Registrar
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="mr-2">¿Ya tienes una cuenta?</span>
          <Link to={"/login"}>
            <button className="text-blue-500 transition duration-300 ease-in-out transform hover:scale-105">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
