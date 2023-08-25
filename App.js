/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HomeScreen from './src/screens/Home';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <HomeScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
