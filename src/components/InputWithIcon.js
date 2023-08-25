import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InputWithIcon = ({value, onChangeText, onIconPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search city"
          placeholderTextColor="#ffff"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={onIconPress}>
          <FontAwesome name="search" size={22} color={'#ffff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(135, 206, 235, 0.5)',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    paddingVertical: 8,
    color: 'white',
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
});

export default InputWithIcon;
