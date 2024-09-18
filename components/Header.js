import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import WeeklyCalendar from "./Calendar";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { selectCurrentTheme } from "../reducers/themeSlice"; // Ajouté: Sélection du thème depuis Redux


const Header = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch(); // Utiliser dispatch

  // Ajouté: Récupération du thème courant depuis Redux
  const theme = useSelector(selectCurrentTheme);

  function HandleLogout() {
    dispatch(logout());
    navigation.navigate("SigninScreen");
  }
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      {/* <View style={styles.header}> */}
      <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
        <TouchableOpacity onPress={openModal}>
          <View style={[styles.iconBackground, { backgroundColor: theme.buttonColor }]}>
            <FontAwesome name="calendar" size={24} color={theme.buttonTextColor} />
            {/* Utilisation du thème pour l'icône du calendrier */}
          </View>
        </TouchableOpacity>

        {/* Utilisation du thème pour le titre */}
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Aujourd'hui</Text>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
            // Utilisation du thème pour la bordure de l'icône
            style={[styles.icon, { borderColor: theme.buttonColor }]}
          >
            <View>
              {/* Utilisation du thème pour l'icône utilisateur */}
              <FontAwesome name="gear" size={24} color={theme.buttonColor} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => HandleLogout()}>
            <View style={[styles.iconBackground, { backgroundColor: theme.buttonColor }]}>
              {/* Utilisation du thème pour l'icône de déconnexion */}
              <FontAwesome name="power-off" size={24} color={theme.buttonTextColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* Utilisation du thème pour le fond du modal */}
          <View style={[styles.modalContent, { backgroundColor: theme.secondaryBackgroundColor }]}>
            {/* Utilisation du thème pour le titre du modal */}
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>Sélectionnez une date</Text>
            <Calendar
              onDayPress={(day) => {
                const selectedDate = new Date(day.dateString);
                setSelectedDate(selectedDate);
                closeModal();
              }}
              markedDates={{
                [selectedDate.toISOString().split("T")[0]]: {
                  selected: true,
                  selectedColor: theme.buttonColor, // Utilisation du thème pour le jour sélectionné
                },
              }}
              theme={{
                backgroundColor: theme.backgroundColor,
                calendarBackground: theme.secondaryBackgroundColor, // Fond du calendrier
                textSectionTitleColor: theme.textColor, // Couleur des titres des sections (jours de la semaine)
                selectedDayBackgroundColor: theme.buttonColor, // Fond du jour sélectionné
                selectedDayTextColor: theme.buttonTextColor, // Texte du jour sélectionné
                todayTextColor: theme.buttonColor, // Couleur du texte du jour actuel
                dayTextColor: theme.textColor, // Couleur du texte des jours normaux
                monthTextColor: theme.textColor, // Couleur du texte pour le mois
                arrowColor: theme.buttonColor, // Couleur des flèches du calendrier
                textDisabledColor: '#666', // Couleur des jours désactivés
              }}
            />
            <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { borderColor: theme.buttonColor }]}>
              {/* Utilisation du thème pour le texte du bouton */}
              <Text style={[styles.closeButtonText, { color: theme.buttonColor }]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <WeeklyCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "#21005d", La couleur de fond est maintenant appliquée dynamiquement via le thème
  },
  headerRightIcons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 16,
    borderRadius: 20,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBackground: {
    // backgroundColor: "#21005d", La couleur de fond est maintenant appliquée dynamiquement via le thème
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    // backgroundColor: "#FFFFFF", La couleur de fond est maintenant appliquée dynamiquement via le thème
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    // color: "#21005d", La couleur de fond est maintenant appliquée dynamiquement via le thème
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    // backgroundColor: "#FFFFFF", La couleur de fond est maintenant appliquée dynamiquement via le thème
    borderWidth: 1,
    // borderColor: "#21005d", La couleur de fond est maintenant appliquée dynamiquement via le thème
    borderRadius: 10,
  },
  closeButtonText: {
    // color: "#21005d", La couleur de fond est maintenant appliquée dynamiquement via le thème
    fontWeight: "bold",
  },
});

export default Header;
