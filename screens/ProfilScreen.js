import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import HeaderButtons from "../components/HeaderButtons";
import { useDispatch, useSelector } from 'react-redux';
import { savesetting } from '../reducers/user';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profilePicture = useSelector(state => state.user.value.profilePicture);
  const username = useSelector(state => state.user.value.username);
  const token = useSelector(state => state.user.value.token);

  const [isModalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      dispatch(savesetting({ profilePicture: selectedImageUri }));

      // Enregistrer l'image sur le serveur
      const formData = new FormData();
      formData.append("token", token);
      const fileName = selectedImageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image`;

      formData.append("photoFromFront", {
        uri: selectedImageUri,
        name: fileName,
        type: fileType,
      });

      fetch(`${apiUrl}/users/settings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data", 
        },
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          Alert.alert("Succès", "Votre photo de profil a été mise à jour !");
        } else {
          Alert.alert("Erreur", data.error || "Une erreur s'est produite.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la photo de profil:", error);
        Alert.alert("Erreur", "Impossible de se connecter au serveur.");
      });

      setModalVisible(false); // Fermer la modal après la sélection de l'image
    }
  };

  const removeImage = () => {
    dispatch(savesetting({ profilePicture: null }));
    setModalVisible(false); // Fermer la modal après suppression de l'image
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderButtons />

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.avatarContainer}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.avatar} />
          ) : (
            <FontAwesome name="user" size={48} color="#000" />
          )}
          <View style={styles.cameraIconContainer}>
            <FontAwesome name="camera" size={16} color='#ffffff' />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{username || '[Prenom]'}</Text> 
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Mes Sessions" })
        }
      >
        <FontAwesome name="graduation-cap" size={24} color="#fff" />
        <Text style={styles.textBtn}>Vos sessions d'études</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sessionBtn]}
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Pomodoro" })
        }
      >
        <Text style={styles.sessionBtnText}>Lancer un Pomodoro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.sessionBtn]}
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Ajouter une session" })
        }
      >
        <Text style={styles.sessionBtnText}>
          Planifier une nouvelle session d'étude
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                  <FontAwesome name="image" size={24} color="orange" />
                  <Text style={styles.modalButtonText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={removeImage}>
                  <FontAwesome name="trash" size={24} color="black" />
                  <Text style={styles.modalButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  profileContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: 'relative',
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  cameraIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#21005D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderRadius: 2,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "space-between",
    backgroundColor: "#21005D",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    height: 50,
    justifyContent: "center",
    marginBottom: 20,
  },

  textBtn: {
    textAlign: "center",
    marginLeft: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  sessionBtn: {
    backgroundColor: "#21005d",
    justifyContent: "center",
  },

  sessionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },

  modalButton: {
    alignItems: 'center',
  },

  modalButtonText: {
    marginTop: 8,
    fontSize: 16,
    color: "#000",
  },
});

export default ProfileScreen;