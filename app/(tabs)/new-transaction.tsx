import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import ScreenTitle from '@/components/ScreenTitle';

export default function NewTransactionScreen() {
  return (
    <View style={styles.container}>
      <ScreenTitle title='Add Transaction' subtitle='Record your income or expense'/>
      <Text>New Transaction</Text>
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
