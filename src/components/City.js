import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const City = ({handleCityClick, cities, heading}) => {
  return (
    <View style={{padding: 10}}>
      <Text style={styles.headingStyle}>{heading}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityContainer}
            onPress={() => handleCityClick(city)}>
            <Text>{city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default City;

const styles = StyleSheet.create({
  cityContainer: {
    backgroundColor: 'rgba(135, 206, 235, 0.7)',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  headingStyle: {
    color: '#fff',
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 5,
    marginBottom: 10,
  },
});
