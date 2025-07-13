import React from "react";
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IRequestLogin } from "../api/types/IUser";

interface Props {
  form: IRequestLogin;
  handleChange: (field: keyof IRequestLogin, value: string) => void;
}

const LoginForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Usuario */}
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="account" size={24} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#aaa"
          value={form.userName}
          onChangeText={(text) => handleChange("userName", text)}
        />
      </View>

      {/* Contraseña */}
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name="lock" size={24} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>

      {/* Enlace olvidó contraseña */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
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

export default LoginForm;


