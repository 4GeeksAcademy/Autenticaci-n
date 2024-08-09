import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Private = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login");
        }
    }, [actions]);

    return (
        <div className="text-center">
        <img src="https://as1.ftcdn.net/v2/jpg/00/06/32/36/1000_F_6323665_QqvWsRemvwDGspEbkJHJ6wDT1qseQQ2h.jpg"></img>
        <button onClick={() => actions.logout()}>LogOut</button>
        </div>
    );
};  

export default Private;