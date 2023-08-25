// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import axios from 'axios';

// const SearchBar = () => {
//   const [searchText, setSearchText] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const fetchSuggestions = async () => {
//     try {
//       const response = await axios.get(
//         `http://api.geonames.org/searchJSON?q=${searchText}&maxRows=5&username=mohd_anas`,
//       );
//       const suggestions = response.data.geonames.map(item => item.name);
//       setSuggestions(suggestions);
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     }
//   };

//   useEffect(() => {
//     if (searchText.length > 2) {
//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchText]);

//   const handleSelectSuggestion = suggestion => {
//     console.log({suggestion});
//     setSearchText(suggestion);
//     setSuggestions([]);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Search for a city"
//         value={searchText}
//         onChangeText={text => setSearchText(text)}
//       />
//       {suggestions.length > 0 && (
//         <FlatList
//           data={suggestions}
//           renderItem={({item}) => (
//             <TouchableOpacity onPress={() => handleSelectSuggestion(item)}>
//               <Text style={styles.suggestion}>{item}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//           style={styles.suggestionsContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 20,
//     paddingHorizontal: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     marginBottom: 10,
//   },
//   suggestion: {
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   suggestionsContainer: {
//     maxHeight: 150,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     backgroundColor: 'white',
//   },
// });

// export default SearchBar;
