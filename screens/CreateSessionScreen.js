import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import PeriodicitySelectorModal from "../components/PeriodicitySelectorModal";
import CalendarModal from "../components/CalendarModal";
import TimePickerButton from "../components/TimePickerButton";
import HeaderButtons from "../components/HeaderButtons";
import CycleModal from "../components/CycleModal"; // Importation du CycleModal
import { addSession, updateSession } from "../reducers/createSession";
import PomodoroParams from "../components/PomodoroParams";
import { selectCurrentTheme } from "../reducers/themeSlice"; // Importation du thème


const { width, height } = Dimensions.get("window");

const CreateSessionScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const existingSession = route.params?.session || null;

  const now = new Date();
  const sessionData = existingSession || {};

  const userId = useSelector((state) => state.user.value.userId);
  const token = useSelector((state) => state.user.value.token);

  const theme = useSelector(selectCurrentTheme); // Récupération du thème courant

  const [selectedDate, setSelectedDate] = useState(
    new Date(sessionData.selectedDate || now)
  );
  const [startTime, setStartTime] = useState(
    new Date(sessionData.startTime || now)
  );
  const [endTime, setEndTime] = useState(new Date(sessionData.endTime || now));
  const [selectedOption, setSelectedOption] = useState(
    sessionData.selectOption || "Routine"
  );
  const [title, setTitle] = useState(sessionData.title || "");
  const [status, setStatus] = useState("Planifiée");
  const [description, setDescription] = useState(sessionData.description || "");
  const [selectPeriodicity, setSelectPeriodicity] = useState(
    sessionData.selectPeriodicity || "Quotidienne"
  );
  // const [cycles, setCycles] = useState(1); // Nouvel état pour les cycles
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [numberOfCycles, setNumberOfCycles] = useState(1);
  const pomodoroParams = { numberOfCycles, workDuration, breakDuration };
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCycleModalVisible, setIsCycleModalVisible] = useState(false); // État pour la visibilité du modal de cycle

  useEffect(() => {
    // Convertir la durée en millisecondes
    const workDurationMillis = workDuration * 60 * 1000;
    const breakDurationMillis = breakDuration * 60 * 1000;
    const totalCycleDuration = workDurationMillis + breakDurationMillis;
    const totalDurationMillis = numberOfCycles * totalCycleDuration;

    // Calculer l'heure de fin
    const newEndTime = new Date(startTime.getTime() + totalDurationMillis);

    // Mettre à jour l'état avec la nouvelle heure de fin
    setEndTime(newEndTime);
  }, [numberOfCycles, workDuration, breakDuration, startTime]);
  const handleCancelSession = () => {
    resetFields();
    navigation.navigate("Mes Sessions");
  };

  const handleAddSession = () => {
    console.log("numberOfCycles:", numberOfCycles);
    console.log("workduration:", workDuration);
    console.log("breakduration:", breakDuration);

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const method = existingSession ? "PUT" : "POST";
    const url = `${apiUrl}/sessions/create/${selectedOption}`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        _id: existingSession?._id,
        userId,
        title,
        selectedOption,
        selectedDate,
        selectPeriodicity,
        startTime,
        endTime,
        description,
        status,
        numberOfCycles,
        workDuration,
        breakDuration,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if (existingSession) {
            dispatch(updateSession(data.session));
            navigation.navigate("TabNavigator", { screen: "Mes Sessions" });
          } else {
            dispatch(
              addSession({
                userId: data.userId,
                title: data.title,
                selectedOption: data.selectedOption,
                selectedDate: data.selectedDate,
                selectPeriodicity: data.selectPeriodicity,
                startTime: data.startTime,
                endTime: data.endTime,
                description: data.description,
                status: "Planifiée",
                numberOfCycles: data.numberOfCycles,
                workDuration: data.workDuration,
                breakDuration: data.breakDuration,
              })
            );
            resetFields();
            navigation.navigate("SessionScreen", {
              SessionProps: {
                status: "Planifiée",
                Title: title,
                startTime: `${startTime}`,
                endTime: `${endTime}`,
                description: description,
              },
            });
          }
        }
      });
  };

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setSelectedDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setSelectedOption("Routine");
    setSelectPeriodicity("Quotidienne");
    setNumberOfCycles(1); // Réinitialiser les cycles
    setBreakDuration(25);
    setWorkDuration(5);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.headerButtons}>
        <HeaderButtons />
      </View>
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Text style={[styles.labelCreateSession, { color: theme.textColor }]}>
              
              Paramètres de planification de votre session :
            
            </Text>
          </View>

          <TextInput
            style={[styles.input, { borderColor: theme.borderColor, backgroundColor: theme.inputColor }]}
            placeholder="Ajouter un titre"
            placeholderTextColor={theme.inputTextColor}
            value={title}
            onChangeText={setTitle}
          />

          {/* <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.leftButton,
                selectedOption === "Routine" && styles.buttonSelected,
                selectedOption === "Routine" && { backgroundColor: theme.buttonColor },
              ]}
              onPress={() => setSelectedOption("Routine")}
            >
              <Text style={styles.buttonText}>Routine</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.rightButton,
                selectedOption === "Once" && styles.buttonSelected,
                selectedOption === "Once" && { backgroundColor: theme.buttonColor },
              ]}
              onPress={() => setSelectedOption("Once")}
            >
              <Text style={styles.buttonText}>Une seule fois</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.leftButton,
                { backgroundColor: selectedOption === "Routine" ? theme.buttonColor1 : theme.buttonColor2 },
              ]}
              onPress={() => setSelectedOption("Routine")}
            >
              <Text style={[styles.buttonText, { color:  selectedOption === "Routine" ? theme.buttonTextColor : theme.textColor}]}>Routine</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.rightButton,
                { backgroundColor: selectedOption === "Once" ? theme.buttonColor1 : theme.buttonColor2 },
              ]}
              onPress={() => setSelectedOption("Once")}
            >
              <Text style={[styles.buttonText, { color:  selectedOption === "Once" ? theme.buttonTextColor : theme.textColor}]}>Une seule fois</Text>
            </TouchableOpacity>
          </View>


          {selectedOption === "Routine" && (
            <View style={styles.row}>
              <Text style={[styles.label, { color: theme.textColor }]}>Choisir une périodicité :</Text>
              <TouchableOpacity
                style={[styles.periodicityButton, { backgroundColor: theme.buttonColor }]}
                onPress={() => setIsModalVisible(true)}
              >
                <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>{selectPeriodicity}</Text>
              </TouchableOpacity>
            </View>
          )}

          <PeriodicitySelectorModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onPeriodicitySelect={(selectedPeriodicity) => {
              setSelectPeriodicity(selectedPeriodicity);
              setIsModalVisible(false);
            }}
            selectPeriodicity={selectPeriodicity}
          />

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>Choisir une date :</Text>
            <TouchableOpacity
              onPress={() => setIsCalendarVisible(true)}
              style={[styles.dateButton, { backgroundColor: theme.buttonColor }]}
            >
              <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
                {selectedDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <CalendarModal
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            visible={isCalendarVisible}
            onClose={() => setIsCalendarVisible(false)}
          />

          {/* Ajouter le bouton pour choisir le nombre de cycles */}
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>Personnaliser le timer :</Text>
            <TouchableOpacity
              style={[styles.cycleButton, { backgroundColor: theme.buttonColor }]}
              onPress={() => setIsCycleModalVisible(true)}
            >
              <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>{numberOfCycles} cycles</Text>
            </TouchableOpacity>
          </View>

          <PomodoroParams
            visible={isCycleModalVisible}
            onClose={() => setIsCycleModalVisible(false)}
            onSubmit={(numberOfCycles, workDuration, breakDuration) => {
              setNumberOfCycles(numberOfCycles);
              setWorkDuration(workDuration);
              setBreakDuration(breakDuration);
              setIsCycleModalVisible(false);
            }}
          />

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>Définir l'heure de début :</Text>
            <TimePickerButton
              selectedTime={startTime}
              onSelectTime={setStartTime}
            />
            {/* <Text style={styles.label}>Jusqu'à :</Text> */}
            {/* <Text style={styles.endTimeText}> */}
            {/* {endTime.toLocaleTimeString()} Affichage de l'heure de fin */}
            {/* {endTime.toLocaleTimeString()} Affichage de l'heure de fin */}
            {/* </Text> */}
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.textColor }]}>Heure de fin estimée à :</Text>
            <View style={[styles.endTimeContainer, { backgroundColor: theme.buttonColor2 }]}>
              <Text style={[styles.endTimeText, { color: theme.textColor }]}>
                {/* {endTime.toLocaleTimeString()} Affichage de l'heure de fin */}
                {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>

          <TextInput
            style={[styles.input, styles.textArea, { borderColor: theme.borderColor, backgroundColor: theme.inputColor }]}
            placeholder="Ajouter une description"
            placeholderTextColor={theme.inputTextColor}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />

          <View style={styles.uploadContainer}>
            <FontAwesome name="upload" size={24} color={theme.buttonColor} />
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: theme.buttonColor }]}>
              <Text style={[styles.uploadButtonText, {color: theme.buttonTextColor}]}>Ajouter un document</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.buttonColor }]}
              onPress={handleAddSession}
            >
              <Text style={[styles.actionButtonText, {color: theme.buttonTextColor}]}>Ajouter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.buttonColor }]}
              onPress={handleCancelSession}
            >
              <Text style={[styles.actionButtonText, {color: theme.buttonTextColor}]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    padding: width * 0.038,
    // backgroundColor: "#fff",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  labelCreateSession: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  label: {
    fontSize: width * 0.04,
    // color: "#000",
  },
  dateButton: {
    flex: 1,
    height: height * 0.04,
    // backgroundColor: "#21005D",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "48%",
    borderRadius: 15,
  },
  buttonText: {
    // color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  endTimeContainer: {
    // backgroundColor: "#E0E0E0", // Couleur de fond gris clair
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.04, // Hauteur relative à l'écran
    // width: width * 0.25, // Largeur relative à l'écran
    width: "48%",
    borderRadius: 15,
  },
  endTimeText: {
    // color: "#000", // Texte noir
    fontSize: width * 0.04, // Taille du texte
    fontWeight: "bold", // Texte en gras
  },

  input: {
    height: height * 0.07,
    // borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
    borderRadius: 15,
  },
  textArea: {
    height: height * 0.15,
    textAlignVertical: "top",
  },
  leftButton: {
    height: height * 0.04,
    // backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "48%",
  },
  rightButton: {
    height: height * 0.04,
    // backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "48%",
  },
  buttonSelected: {
    // backgroundColor: "#21005D", //Couleur du bouton sélectionné sera gérée dynamiquement via le thème
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    justifyContent: "flex-end",
  },
  uploadButton: {
    marginLeft: width * 0.02,
    // backgroundColor: "#21005D",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.05,
    width: "48%",
  },
  uploadButtonText: {
    // color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  actionButton: {
    height: height * 0.05,
    width: 120,
    // backgroundColor: "#21005D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: height * 0.015,
  },
  actionButtonText: {
    // color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  periodicityButton: {
    // backgroundColor: "#21005D",
    height: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 15,
  },
  actionButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cycleButton: {
    flex: 1,
    height: height * 0.04,
    // backgroundColor: "#21005D",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "48%",
    borderRadius: 15,
    // marginBottom: height * 0.02,
  },
  cycleButtonText: {
    // color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default CreateSessionScreen;
