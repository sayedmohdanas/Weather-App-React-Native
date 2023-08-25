import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import {ImageBackground, Alert, StyleSheet} from 'react-native';
import ShowData from '../components/ShowData';
import WeatherForecast from '../components/WeatherForecast';
import City from '../components/City';
import InputWithIcon from '../components/InputWithIcon';
import {apiKey} from '../utils/keys';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchBox = () => {
  const defaultCity = 'Mumbai';
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [recentSearch, setRecentSearch] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [tempType, setTempType] = useState('Celsius');
  const cities = ['Mumbai', 'Lucknow', 'Delhi', 'Hyderabad', 'Kolkata'];

  const weather = Array.isArray(weatherData?.weather)
    ? weatherData?.weather[0]
    : {};

  const handleCityClick = city => {
    setSearchText(city);
    search(city);
  };

  const currentWeather = weather.main;

  const getBackgroundImage = currentWeather => {
    switch (currentWeather) {
      case 'Haze':
        return require('../../assests/sunny.jpg');
      case 'Rain':
        return require('../../assests/rainy.jpg');
      case 'Clouds':
        return require('../../assests/cloudy.jpg');
      case 'Mist':
        return require('../../assests/cloudy.jpg');

      default:
        return require('../../assests/sunny.jpg');
    }
  };

  const backgroundImage = useMemo(
    () => getBackgroundImage(currentWeather),
    [currentWeather],
  );

  const addNewCity = async (city, prevListCity = []) => {
    const cityArr = prevListCity.length > 0 ? prevListCity : recentSearch;
    const recentSearches = [...new Set([city, ...cityArr])];
    setRecentSearch(recentSearches);
    const recentSearchesJSON = JSON.stringify(recentSearches);
    try {
      await AsyncStorage.setItem('recentSearches', recentSearchesJSON);
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const search = async (city, prevListCity = []) => {
    try {
      console.log('ci', {city, searchText});
      if (city) {
        setSearchText(city);
      }
      setIsLoading(true);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city ? city : searchText
        }&appid=${apiKey}`,
      );
      setWeatherData(response.data);
      if (city) {
        console.log({city});
        addNewCity(city, prevListCity);
      } else if (searchText) {
        // console.log({searchText});
        addNewCity(searchText, prevListCity);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('City not found', 'The requested city was not found.');
      } else {
        console.error('An error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('recentSearches');
      if (data) {
        const parsedData = JSON.parse(data);
        setRecentSearch(parsedData);
        return parsedData;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching recent searches:', error);
      return [];
    }
  };

  useEffect(() => {
    const getCurrentLocationWeather = async () => {
      try {
        Geolocation.getCurrentPosition(
          async info => {
            const previousCityList = await fetchData();
            if (!info.coords) {
              setSearchText(defaultCity);
              search(defaultCity, previousCityList);
              return;
            }
            const {latitude, longitude} = info.coords;
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
            );
            const data = response.data;
            search(data.name, previousCityList);
            setSearchText(data.name);
          },
          async error => {
            const previousCityList = await fetchData();
            console.log('FAILED TO GET LOCATION');
            setSearchText(defaultCity);
            search(defaultCity, previousCityList);
          },
        );
      } catch (error) {
        setSearchText(defaultCity);
        search(defaultCity);
      }
    };

    getCurrentLocationWeather();
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.imageContainer}>
      <InputWithIcon
        value={searchText}
        onChangeText={value => {
          console.log({value});
          setSearchText(value);
        }}
        onIconPress={search}
      />
      <City
        setSearchText={setSearchText}
        cities={cities}
        heading={'Popular cities'}
        handleCityClick={handleCityClick}
      />

      {recentSearch.length > 0 && (
        <City
          setSearchText={setSearchText}
          cities={recentSearch}
          heading={'Recent Search'}
          handleCityClick={handleCityClick}
        />
      )}

      <ShowData
        setTemperatureUnit={setTempType}
        temperatureUnit={tempType}
        weatherData={weatherData}
        currentWeather={currentWeather}
        isLoading={isLoading}
      />
      {!isLoading && searchText && (
        <WeatherForecast
          tempType={tempType}
          searchText={searchText}
          city={recentSearch.length > 0 ? recentSearch[0] : ''}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  expandedSearchBox: {
    flex: 3,
  },

  loaderContainer: {
    flex: 1,
  },
});

export default SearchBox;
