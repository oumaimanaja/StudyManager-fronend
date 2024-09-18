import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import HeaderButtons from "../components/HeaderButtons";
import SessionCard from "../components/SessionCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux"; // Importation de useSelector
import { selectCurrentTheme } from "../reducers/themeSlice"; // Importation du sélecteur de thème

const SessionScreen = ({ route }) => {
  const { SessionProps = {} } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigation = useNavigation();

  // Récupérer le thème actuel depuis Redux
  const theme = useSelector(selectCurrentTheme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <HeaderButtons />
      <View style={styles.elementContainer}>
        <Icon
          name="graduation-cap"
          size={20}
          color={theme.textColor} // Couleur de l'icône basée sur le thème
          style={styles.icon}
        />
        <View style={[styles.line, { backgroundColor: theme.textColor }]} />
        <View style={styles.textContainer}>
          <Text style={[styles.topText, { color: theme.textColor }]}>
            Félicitations : {"\n"} Vous avez créé une nouvelle session d'étude :
          </Text>
        </View>

        {/* Ligne après le texte */}
        <View style={[styles.line, { backgroundColor: theme.textColor }]} />

        <View Style={styles.cardsContainer}>
          <View key={SessionProps.id} style={styles.cardWrapper}>
            <SessionCard
              status={SessionProps.status}
              title={SessionProps.Title}
              startTime={new Date(SessionProps.startTime).toLocaleTimeString(
                "fr-FR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              endTime={new Date(SessionProps.endTime).toLocaleTimeString(
                "fr-FR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              description={SessionProps.description}
              onEdit={() => console.log("Éditer", SessionProps.id)}
              onCancel={() => console.log("Annuler", SessionProps.id)}
              onStart={() =>
                !SessionProps.done &&
                navigation.navigate("PomodoroScreen", {
                  fromMenu: false, // Passer fromMenu comme false pour ne pas afficher la modale
                  numberOfCycles: 4,
                  SessionProps: {
                    Title: SessionProps.title,
                    startTime: `${SessionProps.startTime}`,
                    endTime: `${SessionProps.endTime}`,
                    description: SessionProps.description,
                  },
                })
              }
              hideButtons={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: theme.buttonColor }]}
          onPress={() => {}}
        >
          <Text style={[styles.shareButtonText, { color: theme.buttonTextColor }]}>
            Inviter un ami
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.buttonColor2 }]}
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Mes Sessions" })
          }
        >
          <Text style={[styles.backButtonText, { color: theme.textColor }]}>
            Retour
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elementContainer: {
    alignItems: "center", // Centrer les éléments horizontalement
    paddingVertical: 20,
  },
  textContainer: {
    flexDirection: "row", // Alignement en ligne pour l'icône et le texte
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // Espace entre l'icône et le texte
  },
  topText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center", // Centrer le texte
  },
  line: {
    width: "80%", // Ligne plus courte que la largeur totale de l'écran
    height: 1,
    marginVertical: 10, // Espace autour de la ligne
  },
  shareButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
    marginTop: 20,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 250,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  cardWrapper: {
    marginBottom: 20,
  },
});

export default SessionScreen;
