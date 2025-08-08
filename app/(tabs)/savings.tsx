import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function SavingsScreen() {
  return (
    <View style={styles.container}>
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
