import {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

const SwitchIcon = ({toggleSwitch, on}) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#81b0ff', true: '#81b0ff'}}
        thumbColor={on ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={on}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SwitchIcon;
