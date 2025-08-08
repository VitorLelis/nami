import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text>Wallets</Text>
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
