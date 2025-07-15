import React from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IRequestRecoverPassword } from "../api/types/IUser";

interface Props {
    form: IRequestRecoverPassword;
    handleChange: (field: keyof IRequestRecoverPassword, value: string) => void;
}

const RecoverPasswordForm: React.FC<Props> = ({ form, handleChange }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            {/* email */}
            <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="account" size={24} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    placeholderTextColor="#aaa"
                    value={form.userName}
                    onChangeText={(text) => handleChange("userName", text)}
                />
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 20,
        elevation: 4, // sombra Android
        shadowColor: "#000", // sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        width: "100%",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: "#333",
    }, forgotContainer: {
        alignSelf: "flex-end",
        marginBottom: 20,
        marginTop: -10,
        paddingRight: 4,
    },
    forgotText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "500",
        textDecorationLine: "underline",
    },

});

export default RecoverPasswordForm;