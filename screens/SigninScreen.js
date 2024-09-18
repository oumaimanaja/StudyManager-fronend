import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Utiliser dispatch
  // Fonction pour gérer la connexion
  const handleSignIn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Vérifiez que tous les champs sont remplis
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // Envoyer une requête POST à la route '/signip'
    fetch(`${apiUrl}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from API:", data);
        if (data.result) {
          // Si la connexion est réussit, récuperez le token et naviguez vers la page de profil
          dispatch(
            login({
              username: data.username,
              token: data.token,
              // email: data.email,
              userId: data.userId,
            })
          );
          //console.log(data.userId);
          navigation.navigate("ProfilScreen");
        } else {
          // Affichez une alerte si la connexion échoue
          Alert.alert("Erreur", data.error || "Une erreur s'est produite.");
        }
      })
      .catch((error) => {
        console.error("Erreur User not found or wrong password ", error);
        Alert.alert("Erreur", "Impossible de se connecter au serveur.");
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue à StudyManager</Text>
      <Text style={styles.subtitle}>
        Organisez vos études, suivez vos progrès, et réussissez vos examens
      </Text>

      <TextInput
        style={styles.input}
        placeholder="votre adresse e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="votre mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.signinButton}
        activeOpacity={0.8}
        onPress={handleSignIn}
      >
        <Text style={styles.signinButtonText}>Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          /* Handle Forgot Password */
        }}
      >
        <Text style={styles.linkText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
        <Text style={styles.linkText}>S'inscrire ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signinButton: {
    backgroundColor: "#21005D",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    height: 50,
    backgroundColor: "#21005D",
    justifyContent: "center",
    marginBottom: 20,
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#21005D",
    marginTop: 25,
    textAlign: "center",
  },
  backArrow: {
    fontSize: 24,
    color: "#21005D",
    marginTop: 30,
    textAlign: "left",
  },
});

export default SignInScreen;
