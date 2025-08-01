import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import LoginForm from "../../components/LoginForm";
import { IRequestLogin } from "../../api/types/IUser";
import { getProfile, login } from "../../api/UserApi";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showToast } from "../../utils/showToast";


export default function LoginScreen() {
    const [form, setForm] = useState<IRequestLogin>({
        userName: "",
        password: ""
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


    //Aquí se guarda el error
    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const loginUser = async () => {
        setError(null);

        if (!form.userName || !form.password) {
            setError("Por favor completa todos los campos");
            return;
        }

        const response = await login(form);

        if (response?.token) {
            showToast("success", "Éxito", "Sesión iniciada correctamente.");
            navigation.navigate("Home"); // solo si ya guardaste el token
        } else if (response?.error) {
            setError(response.error);
        } else {
            setError("Error inesperado al iniciar sesión.");
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
                        source={require("../../../assets/img/logo.jpg")}
                        style={styles.logo}
                    />
                </View>

                <Text style={styles.title}>Bienvenido</Text>

                {/* Mensaje de error */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <LoginForm form={form} handleChange={handleChange} />

                <TouchableOpacity style={styles.button} onPress={loginUser}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.registerLink}>Regístrate</Text>
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
    }, forgotContainer: {
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    forgotText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "500",
        textDecorationLine: "underline",
    },

});
