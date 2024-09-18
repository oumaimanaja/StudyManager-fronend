import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderButtons from "../components/HeaderButtons";
import { useFocusEffect } from "@react-navigation/native";
import SessionCard from "../components/SessionCard";
import CycleModal from "../components/CycleModal";
import ProgressBar from "../components/ProgressBar";
import HeaderBackButton from "../components/HeaderBackButton";
import PomodoroParams from "../components/PomodoroParams";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../reducers/themeSlice";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function PomodoroScreen({ route, navigation }) {
  const theme = useSelector(selectCurrentTheme); // Récupérer le thème actuel

  const {
    numberOfCycles: initialNumberOfCycles = 1,
    SessionProps = {},
    fromMenu = false,
    workDuration: initialWorkDuration = 25,
    breakDuration: initialBreakDuration = 5,
  } = route.params || {};
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [numberOfCycles, setNumberOfCycles] = useState(initialNumberOfCycles);
  const [workDuration, setWorkDuration] = useState(initialWorkDuration);
  const [breakDuration, setBreakDuration] = useState(initialBreakDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cycle, setCycle] = useState("work");
  const [key, setKey] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [sessionVisible, setSessionVisible] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false); // État pour forcer le rerender
  // const durationColor = (cycle === "work") ? workDuration * 60 : breakDuration * 60;
  // const durationColor = workDuration * 60 ? cycle ==='work' : breakDuration * 60;

  useFocusEffect(
    useCallback(() => {
      if (fromMenu) {
        setShowModal(true); // Affiche la modale uniquement si fromMenu est vrai
      } else {
        setShowModal(false); // Cache la modale si fromMenu est faux
      }

      setIsPlaying(false);
      setCycle("work");
      setKey((prevKey) => prevKey + 1);
      setCompletedCycles(0);
      setSessionVisible(!fromMenu); // Cache la session si fromMenu est vrai

      return () => {
        // Cleanup si nécessaire
      };
    }, [fromMenu])
  );

  useEffect(() => {
    if (completedCycles >= numberOfCycles * 2) {
      setIsPlaying(false);
    }
  }, [completedCycles, numberOfCycles]);

  const handleComplete = () => {
    if (completedCycles < numberOfCycles * 2 - 1) {
      console.log(completedCycles);
      setCycle(cycle === "work" ? "break" : "work");
      setCompletedCycles(completedCycles + 1);
      setKey(key + 1);
    } else {
      setIsPlaying(false);
      setCompletedCycles(0);
      markSessionAsDone(SessionProps.session_id);
      console.log("sessions marked as done");
      SessionProps.status = "Terminée";
    }

    return { shouldRepeat: false };
  };

  const markSessionAsDone = (session_id) => {
    console.log("this is session id ", session_id);
    fetch(`${apiUrl}/sessions/markasdone/${session_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setRefreshFlag((prev) => !prev); // Forcer le rerender après avoir marqué comme terminé
      })
      .catch((error) => {
        console.error("Error marking session done:", error);
      });
  };
  const handleModalSubmit = (cycles) => {
    setNumberOfCycles(cycles);

    setSessionVisible(false); // Cache la SessionCard après avoir soumis le nombre de cycles
    setShowModal(false); // Cache la modal
  };
  const toggleStartPause = () => {
    setIsPlaying(!isPlaying);
  };

  const restartTimer = () => {
    setIsPlaying(false);
    setKey(key + 1);
    setCycle("work");
    setCompletedCycles(0);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {!fromMenu ? <HeaderBackButton /> : <HeaderButtons />}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {sessionVisible && (
          <SessionCard
            session_id={SessionProps._id}
            status={SessionProps.status}
            title={SessionProps.title}
            startTime={
              SessionProps?.startTime
                ? new Date(SessionProps.startTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Heure de début non définie"
            }
            endTime={
              SessionProps?.endTime
                ? new Date(SessionProps.endTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Heure de fin non définie"
            }
            description={SessionProps.description}
            showButton={false}
          />
        )}

        <View style={styles.timerContainer}>
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={cycle === "work" ? workDuration : breakDuration}
            colors={["#21005D", "#562A78", "#8B558D", "#C7807B", "#EC6E5B"]}
            // colors={["red", "green", "white", "#C7807B", "#EC6E5B"]}
            // colorsTime={[workDuration, 3 * (workDuration/4), workDuration/2, (workDuration/4), 0]}
            colorsTime={[
              cycle === "work" ? workDuration : breakDuration,
              3 * ((cycle === "work" ? workDuration : breakDuration) / 4),
              (cycle === "work" ? workDuration : breakDuration) / 2,
              (cycle === "work" ? workDuration : breakDuration) / 4,
              0,
            ]}
            strokeWidth={40}
            size={300}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => (
              <View style={styles.timerContent}>
                <Text style={[styles.timerText, { color: theme.textColor }]}>
                  {formatTime(remainingTime)}
                </Text>
                <Text style={[styles.timerLabel, { color: theme.textColor }]}>
                  {cycle === "work" ? "Concentrez-vous" : "Prenez une pause"}
                </Text>
              </View>
            )}
          </CountdownCircleTimer>
        </View>
        <ProgressBar
          totalCycles={numberOfCycles * 2}
          completedCycles={completedCycles}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.smallIconButton,
              {
                backgroundColor: isPlaying
                  ? theme.cancelButtonColor || "#FF6F61"
                  : theme.buttonColor,
              },
            ]}
            onPress={toggleStartPause}
          >
            <Icon
              name={isPlaying ? "pause" : "play"}
              size={15}
              color={theme.buttonTextColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.smallIconButton, { backgroundColor: "red" }]}
            onPress={restartTimer}
          >
            <Icon name="rotate-left" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PomodoroParams
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(numberOfCycles, workDuration, breakDuration) => {
          setNumberOfCycles(numberOfCycles);
          setWorkDuration(workDuration);
          setBreakDuration(breakDuration);

          handleModalSubmit(numberOfCycles);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sessionCard: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    marginBottom: 30,
    alignItems: "center",
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sessionTime: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  sessionDescription: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  timerContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  timerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  timerLabel: {
    fontSize: 20,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxWidth: 150,
    marginBottom: 1,
  },
  smallIconButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
