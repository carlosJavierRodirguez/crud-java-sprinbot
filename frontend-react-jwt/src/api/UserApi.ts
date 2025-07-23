import { USER_END_POINT, USER_PUBLIC_END_POINT, FORGOT_PASSWORD_PUBLIC } from "../constants/endPoinst";
import { getToken, setToken } from "./Token";
import { IRequestLogin, IRequestRegister, IRequestRecoverPassword } from "./types/IUser";
import { validateLoginForm } from "../utils/validators";

export const login = async (register: IRequestLogin) => {
    const error = validateLoginForm(register);

    if (error) {
        return { error };
    }

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

        // if (!response.ok) throw new Error("Error en el registro");

        let data = await response.json();

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

export const recoverPassword = async (useName: IRequestRecoverPassword) => {
    try {
        const response = await fetch(`${FORGOT_PASSWORD_PUBLIC}forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(useName),
        });

        if (!response.ok) throw new Error("Error al recuperar la contraseña");

        let data = await response.json();

        console.log(data);

        return data;

    } catch (error) {
        return { error: "Error en la conexión" };
    }
}