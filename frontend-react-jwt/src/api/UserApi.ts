import { USER_END_POINT, USER_PUBLIC_END_POINT, FORGOT_PASSWORD_PUBLIC } from "../constants/endPoinst";
import { getToken, setToken } from "./Token";
import { IRequestLogin, IRequestRegister, IRequestRecoverPassword } from "./types/IUser";
import { validateLoginForm } from "../utils/validators";

export const login = async (credentials: IRequestLogin) => {

    const error = validateLoginForm(credentials);

    if (error) {
        return { error };
    }

    try {
        const response = await fetch(`${USER_PUBLIC_END_POINT}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (response.status === 403) {
            return { error: "Credenciales incorrectas" };
        }

        if (!response.ok) throw new Error("Error en el login");

        let data = await response.json();


        if (data.token) {
            await setToken(data.token);
            return data;
        } else {
            return { error: "No se recibió token" };
        }

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

        let data = await response.json();

        return data;

    } catch (error) {
        return error;
    }
};

export const getProfile = async () => {
    try {

        // Obtenemos el token
        const token = await getToken();

        const response = await fetch(`${USER_END_POINT}profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error en el login");

        let data = await response.json();

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