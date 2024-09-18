import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Share,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SessionButton = ({ props, onStart, onDelete, session_id }) => {
  // Conditionne l'affichage du bouton Share
  const hideButton = !(
    props.status == "Terminée" ||
    props.status == "Manquée" ||
    props.status == "Abandonnée"
  );
  const buttonStyle = (() => {
    switch (props.status) {
      case "Terminée":
        return styles.doneButton;
      case "Manquée":
        return styles.missedButton;
      case "En cours":
        return styles.inProgressButton;
      default:
        return styles.startButton;
    }
  })();

  const buttonText = (() => {
    switch (props.status) {
      case "Terminée":
        return "Relancer";
      case "Manquée":
        return "Replanifer";
      case "Abandonnée":
        return "Replanifer";
      case "Planifiée":
        return "Commencer";
      case "En cours":
        return "Reprendre";
      default:
        return "Commencer";
    }
  })();

  const buttonTextStyle = () => {
    switch (props.status) {
      case "Terminée":
        return styles.doneButtonText;
      case "Manquée":
        return styles.missedButtonText;
      case "En cours":
        return styles.inProgressButtonText;
      default:
        return styles.startButtonText;
    }
  };
  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/sessions`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: sessionId }),
        }
      );

      const result = await response.json();

      if (result.result) {
        console.log("Session deleted successfully");
        // Vous pouvez ajouter ici une logique pour mettre à jour l'état ou la UI après la suppression
      } else {
        console.error("Error deleting session:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
    console.log(props.session_id);
    deleteSession(props.session_id);
  };
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey ! 

          Je viens de créer une session d’étude intitulée : ${props.title}.
          
          🗓 Date : ${props.date}
          ⏰ Heure : ${props.startTime} ▶ ${props.endTime}
          📝 Description : ${props.description}
          
          Ça te dit de te joindre à moi ? 😊 `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.iconButtonContainer}>
      <View style={styles.leftButtons}>
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.leftIconButton, styles.cancelButton]}
        >
          <FontAwesome name="times" size={12} color="#FF6F61" />
        </TouchableOpacity>
        {hideButton && (
          <TouchableOpacity
            onPress={handleShare}
            style={[styles.leftIconButton, styles.startButton]}
          >
            <FontAwesome name="share-alt" size={12} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={onStart}
        style={[styles.iconButton, buttonStyle]}
      >
        <Text style={buttonTextStyle()}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftIconButton: {
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    margin: 5,
  },
  iconButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  cancelButton: {
    borderColor: "#FF6F61",
    backgroundColor: "#FFF",
  },
  startButton: {
    borderColor: "#21005d",
    backgroundColor: "#21005d",
  },
  doneButton: {
    borderColor: "#E0F8E0",
    backgroundColor: "#E0F8E0",
  },
  missedButton: {
    borderColor: "#ec6e5b",
    backgroundColor: "#ec6e5b",
  },
  inProgressButton: {
    borderColor: "#21005d",
    backgroundColor: "#21005d",
  },
  doneButtonText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 12,
  },
  missedButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  inProgressButtonText: {
    color: "#fff", // Couleur pour le texte des sessions en cours
    fontWeight: "bold",
    fontSize: 12,
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default SessionButton;
