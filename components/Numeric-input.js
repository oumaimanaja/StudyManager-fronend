import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const NumericInput = ({
  min = 0,
  max = 100,
  step = 5,
  initialValue = 0,
  onValueChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    if (value < max) {
      const newValue = value + step;
      setValue(newValue);
      onValueChange(newValue); // Passer la nouvelle valeur au parent
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - step;
      setValue(newValue);
      onValueChange(newValue); // Passer la nouvelle valeur au parent
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrement} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={String(value)}
        keyboardType="numeric"
        onChangeText={(text) => {
          const num = parseInt(text, 10);
          if (!isNaN(num) && num >= min && num <= max) {
            setValue(num);
            onValueChange(num); // Passer la nouvelle valeur au parent
          }
        }}
      />
      <TouchableOpacity onPress={increment} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#21005D",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#21005D",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    textAlign: "center",
    width: 60,
  },
});

export default NumericInput;
