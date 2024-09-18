import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../reducers/themeSlice';

const { width, height } = Dimensions.get('window');

const WeeklyCalendar = ({ selectedDate, setSelectedDate }) => {
  const [weekDates, setWeekDates] = useState([]);
  const theme = useSelector(selectCurrentTheme);

  useEffect(() => {
    updateWeekDates(selectedDate);
  }, [selectedDate]);

  const updateWeekDates = (date) => {
    const dayOfWeek = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - dayOfWeek);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(weekStart);
      newDate.setDate(weekStart.getDate() + i);
      dates.push(newDate);
    }
    setWeekDates(dates);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.monthYearContainer}>
          <Text style={[styles.monthYear, { color: theme.textColor }]}>
            {formatMonth(selectedDate)}
          </Text>
          <FontAwesome name="angle-right" size={width * 0.06} color={theme.textColor} style={styles.arrowMonth} />
        </View>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => navigateWeek(-1)} style={styles.arrowButton}>
            <FontAwesome name="angle-left" size={width * 0.06} color={theme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateWeek(1)} style={styles.arrowButton}>
            <FontAwesome name="angle-right" size={width * 0.06} color={theme.textColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.weekContainer}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dateButton}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dayText, { color: theme.textColor }]}>
              {date.toLocaleString('default', { weekday: 'short' }).toUpperCase()}
            </Text>
            <View style={[
              styles.dateCircle,
              date.toDateString() === selectedDate.toDateString() && {
                //backgroundColor: theme.currentTheme === 'dark' ? '#FFFFFF' : '#0000FF', // Blanc pour le mode sombre, bleu pour le clair
                backgroundColor: theme.buttonColor,
              }
            ]}>
              <Text
                style={[
                  styles.dateText,
                  date.toDateString() === selectedDate.toDateString()
                    ? { color: theme.buttonTextColor }
                    : { color: theme.textColor },
                ]}
              >
                {date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.02,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthYear: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  arrowMonth: {
    marginLeft: width * 0.02,
  },
  arrowContainer: {
    flexDirection: 'row',
  },
  arrowButton: {
    marginHorizontal: width * 0.02,
    padding: width * 0.025,
    borderRadius: width * 0.07,
    backgroundColor: 'transparent',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: height * 0.015,
  },
  dayText: {
    fontSize: width * 0.03,
    marginBottom: height * 0.005,
  },
  dateText: {
    fontSize: width * 0.045,
  },
  dateCircle: {
    width: width * 0.1,
    height: width * 0.1,
    // borderRadius: width * 0.05,
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    borderBottomRightRadius: width * 0.05,
    borderBottomLeftRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeeklyCalendar;
