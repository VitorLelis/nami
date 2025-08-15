import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/constants/Colors';
import toMoney from '@/utils/toMoney';

type Props = {
  totalBalance: number;
};

export default function WalletOverview({ totalBalance }: Props) {
  const isNegative = totalBalance < 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name="wallet" size={16} color={Colors.text} />
        <Text style={styles.title}>Wallet Overview</Text>
      </View>

      <View style={styles.dividerContainer}>
        <Text
          style={[
            styles.netWorth,
            { color: isNegative ? Colors.expense : Colors.income },
          ]}
        >
          {toMoney(totalBalance)}
        </Text>
        <Text style={styles.label}>Total Balance</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
  },
  dividerContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.lightGray
  },
  netWorth: {
    fontSize: 22,
    fontWeight: '600',
  },
});
