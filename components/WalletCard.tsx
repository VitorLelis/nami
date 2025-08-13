import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import toMoney from '@/utils/toMoney';

type WalletCardProps = {
  name: string;
  amount: number;
};

export default function WalletCard({ name, amount }: WalletCardProps) {
  const isNegative = amount < 0;

  return (
    <View style={styles.card}>
      {/* Wallet Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Right Side */}
      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: isNegative ? Colors.expense : Colors.income },
          ]}
        >
          {toMoney(amount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  right: {
    alignItems: 'flex-end',
    backgroundColor: Colors.defaultGray
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
