import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WeatherForecastItem = ({
  date,
  temperatureCelsius,
  temperatureFahrenheit,
  conditions,
  tempType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.temperature}>
        {tempType === 'Celsius'
          ? Math.round(temperatureCelsius) + '°C'
          : Math.round(temperatureFahrenheit) + '°F'}
      </Text>
      <Text style={styles.conditions}>{conditions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(135, 206, 235, 0.5)',
    paddingHorizontal: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffff',
  },
  temperature: {
    fontSize: 22,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#ffff',

    marginBottom: 3,
  },
  conditions: {
    fontSize: 14,
    marginTop: 5,
    color: '#ffff',
  },
});

export default WeatherForecastItem;
