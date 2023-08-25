import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchIcon from './Switch';

const ShowData = ({
  weatherData,
  currentWeather,
  setTemperatureUnit,
  temperatureUnit,
  isLoading,
}) => {
  const {name, main} = weatherData;

  const kelvinToCelsius = kelvin => {
    return (kelvin - 273.15).toFixed(2);
  };

  const celsiusToFahrenheit = celsius => {
    return (celsius * 9) / 5 + 32;
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prevUnit =>
      prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius',
    );
  };

  const temperatureInCelsius = useMemo(
    () => kelvinToCelsius(main?.temp),
    [main?.temp],
  );
  const feelsLikeInCelsius = useMemo(
    () => kelvinToCelsius(weatherData.main?.feels_like),
    [weatherData.main?.feels_like],
  );
  const temperatureInFahrenheit = useMemo(
    () => celsiusToFahrenheit(temperatureInCelsius),
    [temperatureInCelsius],
  );
  const feelLikeTemperatureInFahrenheit = useMemo(
    () => celsiusToFahrenheit(feelsLikeInCelsius),
    [feelsLikeInCelsius],
  );
  const temperatureMinInCelsius = useMemo(
    () => kelvinToCelsius(weatherData.main?.temp_min),
    [weatherData.main?.temp_min],
  );
  const temperatureMinInFahrenheit = useMemo(
    () => celsiusToFahrenheit(temperatureMinInCelsius),
    [temperatureMinInCelsius],
  );
  const temperatureMaxInCelsius = useMemo(
    () => kelvinToCelsius(weatherData.main?.temp_max),
    [weatherData.main?.temp_max],
  );
  const temperatureMaxInFahrenheit = useMemo(
    () => celsiusToFahrenheit(temperatureMaxInCelsius),
    [temperatureMaxInCelsius],
  );
  const weatherIcons = {
    Haze: {name: 'weather-sunny', size: 50, color: '#ffff'},
    Clouds: {name: 'weather-cloudy', size: 50, color: '#ffff'},
    Rain: {name: 'weather-partly-rainy', size: 32, color: '#ffff'},
    Mist: {name: 'weather-partly-rainy', size: 32, color: '#ffff'},
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: Dimensions.get('window').width,
            marginBottom: 5,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.name}>
              <Text style={styles.cityName}>{name}</Text>
            </View>
            <View style={styles.name}>
              <SwitchIcon
                on={temperatureUnit === 'Fahrenheit'}
                toggleSwitch={toggleTemperatureUnit}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.feelsLike}>°C</Text>
                <Text style={styles.feelsLike}>°F</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            padding: 10,
            gap: 15,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(135, 206, 235, 0.5)',
                borderRadius: 4,
                justifyContent: 'center',
                height: 120,
              }}>
              <Text style={styles.temperature}>
                {Math.round(
                  temperatureUnit === 'Celsius'
                    ? temperatureInCelsius
                    : temperatureInFahrenheit,
                )}
              </Text>
              <Text style={{fontSize: 30, paddingTop: 5, color: '#fff'}}>
                {temperatureUnit === 'Celsius' ? '°C' : '°F'}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(135, 206, 235, 0.5)',
                borderRadius: 4,
                paddingHorizontal: 30,
                marginBottom: 5,
                height: 120,
              }}>
              {weatherIcons[currentWeather] && (
                <Icon
                  name={weatherIcons[currentWeather].name}
                  size={weatherIcons[currentWeather].size}
                  color={weatherIcons[currentWeather].color}
                />
              )}
              <Text style={styles.cityName}>{currentWeather}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 15, marginBottom: 14}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'rgba(135, 206, 235, 0.5)',
              borderRadius: 4,
              padding: 10,
              flex: 1,
            }}>
            <Text style={styles.feelsLike}>
              Feels Like:{' '}
              {Math.round(
                temperatureUnit === 'Celsius'
                  ? feelsLikeInCelsius
                  : feelLikeTemperatureInFahrenheit,
              )}
            </Text>
            <Text style={{color: '#fff'}}>
              {temperatureUnit === 'Celsius' ? '°C' : '°F'}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              borderRadius: 4,
              padding: 10,
              marginBottom: 5,
              backgroundColor: 'rgba(135, 206, 235, 0.5)',
              flex: 1,
            }}>
            <Text style={styles.feelsLike}>
              Humidity: {weatherData.main?.humidity}%
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'rgba(135, 206, 235, 0.5)',
              borderRadius: 4,
              padding: 10,
              flex: 1,
            }}>
            <Text style={styles.feelsLike}>
              Min Temp:{' '}
              {Math.round(
                temperatureUnit === 'Celsius'
                  ? temperatureMinInCelsius
                  : temperatureMinInFahrenheit,
              )}
            </Text>
            <Text style={{color: '#fff'}}>
              {temperatureUnit === 'Celsius' ? '°C' : '°F'}
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'rgba(135, 206, 235, 0.5)',
              borderRadius: 4,
              padding: 10,
              flex: 1,
            }}>
            <Text style={styles.feelsLike}>
              Max Temp:{' '}
              {Math.round(
                temperatureUnit === 'Celsius'
                  ? temperatureMaxInCelsius
                  : temperatureMaxInFahrenheit,
              )}
            </Text>
            <Text style={{color: '#fff'}}>
              {temperatureUnit === 'Celsius' ? '°C' : '°F'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'rgba(180, 210, 240, 0.5)',
    borderRadius: 4,
  },
  name: {
    marginTop: 10,
    color: 'white',
    borderRadius: 8,
    padding: 5,
    backgroundColor: 'rgba(135, 206, 235, 0.7)',
  },
  weatherInfo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cityName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '500',
    padding: 5,
  },
  temperature: {
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
  },
  feelsLike: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleButton: {
    backgroundColor: 'rgba(135, 206, 235, 0.7)',
    borderRadius: 5,
  },
});

export default ShowData;
