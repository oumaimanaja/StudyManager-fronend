import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import SessionFilter from "../components/SessionFilter";
import { formatDate } from "../modules/formatDate";

import { selectCurrentTheme } from "../reducers/themeSlice"; // Importation du sélecteur de thème

const HomeScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.user.value.userId);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // État pour forcer le rerender
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const token = useSelector((state) => state.user.value.token);
  const theme = useSelector(selectCurrentTheme);
  const [sessionsInProgress, setSessionsInProgress] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [sessionsMissed, setSessionsMissed] = useState(0);
  const [sessionsAbandoned, setSessionsAbandoned] = useState(0);
  
  useFocusEffect(
    useCallback(() => {
      const fetchSessions = async () => {
        try {
          const response = await fetch(`${apiUrl}/sessions/user-sessions`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ userId: userId }),
          });
          const data = await response.json();
          setSessions(data.sessions);

          // Count sessions by status
          const inProgress = data.sessions.filter(session => session.status === 'En cours').length;
          const completed = data.sessions.filter(session => session.status === 'Terminée').length;
          const missed = data.sessions.filter(session => session.status === 'Manquée').length;
          const abandoned = data.sessions.filter(session => session.status === 'Abandonnée').length;

          // Set the state with the calculated counts
          setSessionsInProgress(inProgress);
          setSessionsCompleted(completed);
          setSessionsMissed(missed);
          setSessionsAbandoned(abandoned); // Set the state for Abandonnée sessions

        } catch (error) {
          console.error("Error fetching sessions:", error);
        }
      };

      fetchSessions();
    }, [userId, token, apiUrl, selectedDate, refreshFlag, dispatch])
  );

  const markSessionInProgress = (session_id) => {
    fetch(`${apiUrl}/sessions/markasInProgress/${session_id}`, {
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

  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.selectedDate);
    return sessionDate.toDateString() === selectedDate.toDateString();
  });

  const handleDelete = (sessionId) => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={theme.currentTheme === 'dark' ? "light-content" : "dark-content"} />

      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <View style={[styles.line, { backgroundColor: theme.buttonColor2 }]} />
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredSessions.length === 0 ? (
          <Text style={{ color: theme.textColor }}>Aucune session pour la date sélectionnée</Text>
        ) : (
          filteredSessions.map((session, index) => (
            <View key={session.id || index} style={styles.cardWrapper}>
              <SessionCard
                session_id={session._id}
                status={session.status}
                title={session.title}
                date={formatDate(session.selectedDate)}
                startTime={new Date(session.startTime).toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                endTime={new Date(session.endTime).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                description={session.description}
                onEdit={() =>
                  navigation.navigate("CreateSessionScreen", { session })
                }
                onDelete={handleDelete}
                onStart={() => {
                  markSessionInProgress(session._id);

                  // (session.status === "Planifiée" ||
                  //   session.status === "En cours" ||
                  //   session.status === "Terminée") &&
                  navigation.navigate("PomodoroScreen", {
                    fromMenu: false,
                    numberOfCycles: session.numberOfCycles,
                    workDuration: session.workDuration,
                    breakDuration: session.breakDuration,
                    SessionProps: {
                      session_id: session._id,
                      status: "En cours",
                      title: session.title,
                      startTime: `${session.startTime}`,
                      endTime: `${session.endTime}`,
                      description: session.description,
                    },
                  });
                }}
                showButton={true}
              />
            </View>
          ))
        )}
      </ScrollView>
      <SessionFilter 
        sessionsInProgress={sessionsInProgress} 
        sessionsCompleted={sessionsCompleted} 
        sessionsMissed={sessionsMissed} 
        sessionsAbandoned={sessionsAbandoned}  // Pass the Abandonnée count
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  line: {
    marginBottom: 5,
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default HomeScreen;
