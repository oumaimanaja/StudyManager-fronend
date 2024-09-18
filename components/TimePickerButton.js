import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { fr } from "date-fns/locale";
import { selectCurrentTheme } from "../reducers/themeSlice"; // Importation du thème

// Obtenir les dimensions de l'écran
const { width, height } = Dimensions.get("window");

const TimePickerButton = ({ selectedTime, onSelectTime }) => {
  const [visible, setVisible] = useState(false);

  // Récupérer le thème courant depuis Redux
  const themeApp = useSelector(selectCurrentTheme);

  // Créer un thème personnalisé basé sur le thème par défaut
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: themeApp.buttonColor, // Couleur principale du thème
      surface: themeApp.secondaryBackgroundColor, // Couleur de fond de la modal
      onSurface: themeApp.textColor, // Couleur du texte pour "Sélectionnez l'heure"
      onSurfaceVariant: themeApp.textColor, // il faut que toutes les variantes de surface utilisent la couleur du texte
      backdrop: "rgba(0, 0, 0, 0.5)", // Couleur de fond en arrière-plan de la modal
      surfaceVariant: themeApp.buttonColor3, // Couleur de fond du cercle central (horloge) et des carrés d'heure
      secondaryContainer: themeApp.buttonColor, // Couleur des carrés d'heure quand on clique dessus
      onSecondaryContainer: themeApp.textColor, // Couleur du texte sur fond noir
      onPrimary: themeApp.buttonTextColor, // Forcer le texte de l'heure sélectionnée à être noir
      onPrimaryContainer: themeApp.buttonTextColor, // Couleur du texte sur fond blanc (heure sélectionnée)
    },
  };
  
  




  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.button, { backgroundColor: themeApp.buttonColor }]}
      >
        <Text style={[styles.buttonText, { color: themeApp.buttonTextColor }]}>
          {selectedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
      <PaperProvider theme={theme}>
        <TimePickerModal
          visible={visible}
          onDismiss={() => setVisible(false)}
          onConfirm={({ hours, minutes }) => {
            const time = new Date();
            time.setHours(hours, minutes, 0);
            onSelectTime(time);
            setVisible(false);
          }}
          hours={selectedTime.getHours()}
          minutes={selectedTime.getMinutes()}
          label="Sélectionnez l'heure"
          cancelLabel="Annuler"
          confirmLabel="Confirmer"
          animationType="fade"
          theme={theme} // Appliquer le thème personnalisé à la modal
          locale={fr}
        />


      </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.04, // Hauteur relative à l'écran
    width: width * 0.4435, // Largeur relative à l'écran
    borderRadius: 15,
  },
  buttonText: {
    fontSize: width * 0.04, // Taille de la police relative à l'écran
    fontWeight: "bold",
  },
});

export default TimePickerButton;
