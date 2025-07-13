import { USER_END_POINT, USER_PUBLIC_END_POINT } from "../constants/endPoinst";
import { getToken, setToken } from "./Token";
import { IRequestLogin, IRequestRegister } from "./types/IUser";

export const login = async (register: IRequestLogin) => {
    try {
        const response = await fetch(`${USER_PUBLIC_END_POINT}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(register),
        });

        if (response.status === 403) {
            return { error: "Credenciales incorrectas" };
        }

        if (!response.ok) throw new Error("Error en el login");

        let data = await response.json();

        setToken(data.token);

        console.log(data);

        return data;

    } catch (error) {

        return { error: "Error en la conexión" };
    }
};

export const register = async (register: IRequestRegister) => {
    try {
        const response = await fetch(`${USER_PUBLIC_END_POINT}register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(register),
        });

        if (!response.ok) throw new Error("Error en el registro");

        let data = await response.json();

        console.log(data);

        return data;

    } catch (error) {
        return error;
    }
};

export const getProfile = async () => {
    try {
        const token = await getToken();
        const response = await fetch(`${USER_END_POINT}profile`, {

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            // body: JSON.stringify(register),
        });

        if (!response.ok) throw new Error("Error en el login");
        let data = await response.json();
        // data=data("token");
        console.log(data);
        return data;
    } catch (error) {
        return error;
    }
};