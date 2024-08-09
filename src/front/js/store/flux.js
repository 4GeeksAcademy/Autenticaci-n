const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		// Inicializa el estado aquí si es necesario
		user: null,
		registrationError: null,
	  },
	  actions: {
		test: () => { 
		  console.log("test");
		},
		
		registerUser: async (body) => {
			setStore({ registrationError: null });
		  
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			  });
		  
			  if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
			  }
		  
			  const data = await response.json();
			  console.log(data);
			  setStore({ user: data });
		  
			} catch (error) {
			  console.log(error);
			  setStore({ registrationError: error.message });
			}
		  },
		  
		
		loginUser: async (formData) => {
			const store = getStore();
			try {
			  const response = await fetch(
				`${process.env.BACKEND_URL}/login`,
				{
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify(formData),
				}
			  );
	
			  if (!response.ok) {
				throw new Error("Error en la respuesta del servidor");
			  }
	
			  const data = await response.json();
			  console.log(data);
	
			  // Guardar el token en sessionStorage
			  if (data.token) {
				sessionStorage.setItem("token", data.token);
			  }
	
			  setStore({
				...store,
				user: data.user,
				token: data.token,
			  });
	
			  return data;
			} catch (error) {
			  console.error("Error en el login: ", error);
			  throw error;
			}
		  },	  
		  logout: () => {
			sessionStorage.removeItem("token");
			setStore({
			  ...getStore(),
			  user: null,
			  external_customer_id: null,
			  token: null,
			});
		  },
		}
	};
  };
  
  export default getState;
  