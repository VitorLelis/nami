import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScreenTitle from '@/components/ScreenTitle';

export default function SavingsScreen() {
  return (
    <View style={styles.container}>
      <ScreenTitle title='Saving Goals' subtitle='Track your financial targets'/>
      <Text>Savings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
