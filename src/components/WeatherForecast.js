import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import axios from 'axios';
import WeatherForecastItem from './ForecastComponent';
import LineCharts from './Chart';
import {apiKey} from '../utils/keys';

const WeatherForecast = ({tempType, city}) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: city,
              appid: apiKey,
            },
          },
        );

        const groupedForecasts = {};
        response.data.list.forEach(item => {
          const itemDate = new Date(item.dt_txt).toLocaleDateString();
          if (!groupedForecasts[itemDate]) {
            groupedForecasts[itemDate] = item;
          } else {
            const existingDate = new Date(groupedForecasts[itemDate].dt_txt);
            const newItemDate = new Date(item.dt_txt);
            if (newItemDate > existingDate) {
              groupedForecasts[itemDate] = item;
            }
          }
        });

        const forecasts = Object.values(groupedForecasts).map(item => ({
          date: new Date(item.dt_txt).toLocaleDateString(),
          temperature: item.main.temp,
          temperatureCelsius: item.main.temp - 273.15,
          temperatureFahrenheit: ((item.main.temp - 273.15) * 9) / 5 + 32,

          conditions: item.weather[0].description,
        }));

        setForecastData(forecasts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchForecastData();
  }, [city]);
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          {forecastData.map((day, index) => (
            <WeatherForecastItem
              key={index}
              tempType={tempType}
              date={day.date}
              temperatureCelsius={day.temperatureCelsius}
              temperatureFahrenheit={day.temperatureFahrenheit}
              conditions={day.conditions}
            />
          ))}
        </ScrollView>
      </View>
      {forecastData.length > 0 && (
        <LineCharts tempType={tempType} forecastData={forecastData} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 20,
  },
});

export default WeatherForecast;
