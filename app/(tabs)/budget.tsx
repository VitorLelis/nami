import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScreenTitle from '@/components/ScreenTitle';

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <ScreenTitle title='Budgets' subtitle='Track your spending limits'/>
      <Text>Budget</Text>
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
