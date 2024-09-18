import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ToggleSwitch from "rn-toggle-switch";
import { useSelector, useDispatch } from "react-redux";
import HeaderButtons from "../components/HeaderBackButton";
import { savesetting } from "../reducers/user";
import { setTheme, lightTheme, darkTheme } from "../reducers/themeSlice"; // Import des thèmes centralisés
import * as Notifications from "expo-notifications";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const systemColorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const profileImage = useSelector((state) => state.user.value.profilePicture);
  const token = useSelector((state) => state.user.value.token);
  const currentTheme = useSelector((state) => state.theme.value.currentTheme);

  const theme = currentTheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    // Appliquer le thème du système par défaut si aucun thème n'est défini
    requestNotificationPermission();

    if (!currentTheme) {
      dispatch(setTheme(systemColorScheme));
    }

    fetchSettings();
  }, []);

  const requestNotificationPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If the status is not determined, ask for permission
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permission to send notifications not granted.");
      Alert.alert(
        "Permission Required",
        "Permission to send notifications is required!"
      );
    } else {
      console.log("Permission to send notifications granted.");
    }
  };

  const toggleNotifications = async (enabled) => {
    setNotificationsEnabled(enabled);

    if (enabled) {
      // Schedule a notification when notifications are enabled
      await scheduleNotification();
    } else {
      // Cancel all scheduled notifications when disabled
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  // Schedule a notification
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Session Reminder",
        body: "Your session is about to start soon!",
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  const fetchSettings = () => {
    fetch(`${apiUrl}/users/getSettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            savesetting({ profilePicture: data.settings.profilePicture })
          );
          setTheme(data.settings.theme);
          setNotificationsEnabled(data.settings.notificationsEnabled);
        } else {
          Alert.alert("Erreur", data.error || "Une erreur s'est produite.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des paramètres:", error);
        Alert.alert("Erreur", "Impossible de se connecter au serveur.");
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      dispatch(savesetting({ profilePicture: selectedImageUri }));
      console.log("Selected image URI: ", selectedImageUri);
    }
  };

  const toggleTheme = (isDark) => {
    dispatch(setTheme(isDark ? "dark" : "light"));
  };

  const saveSettings = () => {
    //NAVIGATE en attendant de résoudre le probleme
    navigation.navigate("TabNavigator", { screen: "Mes Sessions" });
    const formData = new FormData();
    formData.append("token", token);
    formData.append("notificationsEnabled", notificationsEnabled);
    formData.append("theme", theme);

    if (profileImage) {
      const fileName = profileImage.split("/").pop();
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image`;

      formData.append("photoFromFront", {
        uri: profileImage,
        name: fileName,
        type: fileType,
      });
    }

    // fetch(`${apiUrl}/users/settings`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((response) => {
    //     console.log("RES", response);
    //     response.json();
    //   })
    //   .then((data) => {
    //     console.log("data", data);
    //     if (data.result) {
    //       Alert.alert(
    //         "Succès",
    //         "Vos paramètres ont été enregistrés avec succès !"
    //       );
    //       navigation.navigate("ProfilScreen"); // Navigate only on success
    //     } else {
    //       Alert.alert("Erreur", data.error || "Une erreur s'est produite.");
    //       return; // Prevents any further code from executing if there's an error
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Erreur lors de la sauvegarde des paramètres:", error);
    //     Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    //     return; // Stops further execution in case of error
    //   });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <HeaderButtons />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={styles.imagelogo}
          source={require("../assets/logogif.gif")}
        />
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Personnalisez votre application
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Photo de Profil
        </Text>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonColor }]}
          onPress={pickImage}
        >
          <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>
            Choisir une photo
          </Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Thème de l'application :
          </Text>
          <ToggleSwitch
            text={{
              on: "Sombre",
              off: "Clair",
              activeTextColor: theme.buttonTextColor, // Couleur du texte activé
              inactiveTextColor: theme.inputTextColor, // Couleur du texte désactivé
            }}
            textStyle={{ fontWeight: "bold" }}
            color={{
              indicator: theme.backgroundColor, // Couleur de l'indicateur (cercle)
              active: theme.buttonColor, // Couleur de fond activée
              inactive: theme.inputColor, // Couleur de fond désactivée
              activeBorder: theme.buttonColor, // Bordure activée
              inactiveBorder: theme.inputColor, // Bordure désactivée
            }}
            active={currentTheme === "dark"}
            disabled={false}
            width={100}
            radius={15}
            onValueChange={(val) => {
              toggleTheme(val);
            }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
            Notifications :
          </Text>
          <ToggleSwitch
            text={{
              on: "Activées",
              off: "Désactivées",
              activeTextColor: theme.buttonTextColor, // Couleur du texte activé
              inactiveTextColor: theme.inputTextColor, // Couleur du texte désactivé
            }}
            textStyle={{ fontWeight: "bold" }}
            color={{
              indicator: theme.backgroundColor, // Couleur de l'indicateur (cercle)
              active: theme.buttonColor, // Couleur de fond activée
              inactive: theme.inputColor, // Couleur de fond désactivée
              activeBorder: theme.buttonColor, // Bordure activée
              inactiveBorder: theme.inputColor, // Bordure désactivée
            }}
            active={notificationsEnabled}
            disabled={false}
            width={100}
            radius={15}
            onValueChange={(val) => {
              toggleNotifications(val); // Mise à jour locale des notifications
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.buttonColor }]}
          onPress={saveSettings}
        >
          <Text
            style={[styles.saveButtonText, { color: theme.buttonTextColor }]}
          >
            Enregistrer les paramètres
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
    margin: 30,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 350,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
  },
  saveButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  imagelogo: {
    height: 150,
    width: 150,
  },
});
