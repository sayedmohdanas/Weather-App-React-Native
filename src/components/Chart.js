import {View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const LineCharts = ({forecastData, tempType}) => {
  const labels = forecastData.map(item => {
    const dateParts = item.date.split('/');
    const month = dateParts[0];
    const day = dateParts[1];
    const yearLastTwoDigits = dateParts[2].slice(-2);
    return `${day}/${month}/${yearLastTwoDigits}`;
  });
  const temperatureCelsius = forecastData.map(item =>
    Math.round(item.temperatureCelsius),
  );
  const temperatureFahrenheit = forecastData.map(item =>
    Math.round(item.temperatureFahrenheit),
  );

  return (
    <View style={{flex: 1}}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data:
                tempType == 'Celsius'
                  ? temperatureCelsius
                  : temperatureFahrenheit,
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        // yAxisLabel="$"
        yAxisSuffix={tempType == 'Celsius' ? '°C' : '°F'}
        yAxisInterval={1}
        chartConfig={{
          formatYLabel: value => Math.round(parseFloat(value)).toString(),

          backgroundColor: 'rgba(135, 206, 235, 0.5)',
          backgroundGradientFrom: 'rgba(135, 206, 235, 0.5)',
          backgroundGradientTo: 'rgba(135, 206, 235, 0.5)',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: 'rgba(135, 206, 235, 0.7)',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
export default LineCharts;
