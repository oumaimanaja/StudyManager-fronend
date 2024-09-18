import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const SessionsChart = ({ chartData }) => {
  return (
    <Card style={styles.chartCard}>
      <View style={styles.customTitleContainer}>
        <Text style={styles.customTitle}>Évolution des sessions</Text>
      </View>
      <Card.Content style={styles.chartCardContent}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={300}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  chartCard: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
    justifyContent: 'center',
  },
  chartCardContent: {
    alignItems: 'center',
  },
  customTitleContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  customTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SessionsChart;
