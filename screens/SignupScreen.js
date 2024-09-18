import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Utiliser dispatch
  // Fonction pour gérer l'inscription
  const handleSignUp = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // Vérifiez que tous les champs sont remplis
    if (!username || !email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    // Envoyer une requête POST à la route '/signup'
    fetch(`${apiUrl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Si l'inscription réussit,récupérez le token et naviguez vers la page de profil
          console.log(data.token);
          dispatch(login({ username: data.username, token: data.token }));
          navigation.navigate("SettingsScreen");
        } else {
          // Affichez une alerte si l'inscription échoue
          Alert.alert("Erreur", data.error || "Une erreur s'est produite.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription:", error);
        Alert.alert("Erreur", "Impossible de se connecter au serveur.");
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue à StudyManager</Text>
      <Text style={styles.subtitle}>Créez votre compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.signupButton}
        activeOpacity={0.8}
      >
        <Text style={styles.signupButtonText}>S'inscrire</Text>
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
    justifyContent: "center", // Center the content vertically
    paddingHorizontal: 30, // Padding on the sides
    paddingVertical: 50, // Padding at the top and bottom to expand vertically
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30, // Space below the title
    textAlign: "center", // Center the title text
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40, // Space below the subtitle
    textAlign: "center", // Center the subtitle text
  },
  input: {
    height: 50, // Increase height for better spacing
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 30, // Space below each input
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signupButton: {
    height: 50, // Même hauteur que les inputs
    backgroundColor: "#21005D", // Couleur de fond
    justifyContent: "center", // Centrer le texte verticalement
    alignItems: "center", // Centrer le texte horizontalement
    borderRadius: 5, // Même bordure arrondie que les inputs
    marginBottom: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backArrow: {
    fontSize: 24,
    color: "#21005D",
    marginTop: 30, // Increase space between buttons
    textAlign: "center",
  },
});

export default SignUpScreen;
