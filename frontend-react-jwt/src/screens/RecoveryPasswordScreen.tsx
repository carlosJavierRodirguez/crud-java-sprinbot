import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
} from "react-native";
import RecoverPasswordForm from "../components/RecoveryPassword";
import { IRequestRecoverPassword } from "../api/types/IUser";
import { recoverPassword } from "../api/UserApi";
import { useNavigation, } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function RecoverPasswordScreen() {
    const [form, setForm] = useState<IRequestRecoverPassword>({ userName: "" });
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    };

    const recoverPasswordUser = async () => {
        setError(null);
        if (!form.userName) {
            return setError("Por favor completa el campo nombre de usuario.");
        }

        const response = await recoverPassword(form);

        if (response?.success) {
            Alert.alert("Éxito", "Revisa tu correo para continuar.");

        } else if (response?.error) {
            setError(response.error);
        } else {
            setError("Error inesperado al recuperar la contraseña.");
        }
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

                <Text style={styles.title}>Recuperación de contraseña</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <RecoverPasswordForm form={form} handleChange={handleChange} />

                <TouchableOpacity style={styles.button} onPress={recoverPasswordUser}>
                    <Text style={styles.buttonText}>Recuperar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonTextReturn}>Volver</Text>
                </TouchableOpacity>
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
    },
    buttonTextReturn: {
        color: "#000",
        textAlign: "center",
        fontSize: 16,
        marginTop: 10,
    },
    registerContainer: {
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
