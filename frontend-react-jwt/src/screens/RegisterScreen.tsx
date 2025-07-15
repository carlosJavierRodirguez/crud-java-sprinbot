import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from "react-native";
import RegisterForm from "../components/RegisterForm";
import { IRequestRegister } from "../api/types/IUser";
import { getProfile, register } from "../api/UserApi";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showToast } from "../utils/showToast";

export default function RegisterScreen() {

    const [form, setForm] = useState<IRequestRegister>({
        userName: "",
        password: "",
        email: ""
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    //Aquí se guarda el error
    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const registerUser = async () => {
        setError(null);

        if (!form.userName || !form.password || !form.email) {
            return setError("Por favor completa todos los campos");
        }

        const response = await register(form);

        if (response?.status === "200 OK") {

            showToast("success", "Éxito", "Usuario registrado correctamente porfavor inicia sesión");
            navigation.navigate("Login");

        } else if (response?.error) {

            showToast("error", "Error", response.error);

        } else {

            showToast("error", "Error", "Error inesperado al registrar usuario");

        }
    };


    const Profile = async () => {
        const response = await getProfile();
        console.log(response);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <Image resizeMode="contain"
                        source={require("../../assets/img/logo.jpg")}
                        style={styles.logo}
                    />
                </View>

                <Text style={styles.title}>Bienvenido</Text>

                {/* Mensaje de error */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <RegisterForm form={form} handleChange={handleChange} />

                <TouchableOpacity style={styles.button} onPress={registerUser}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                {/* ya tiene una cuenta */}
                <View style={styles.registerContainer}>

                    <Text style={styles.registerText}>Ya tiene una cuenta</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.registerLink}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f0",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    card: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#1b4332",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#2d6a4f",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    }, registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
    },

    registerText: {
        fontSize: 15,
        color: "#333",
    },
    registerLink: {
        fontSize: 15,
        color: "#000",
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginLeft: 4,
    }, errorText: {
        color: "#D32F2F",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: -16,
    },

});
