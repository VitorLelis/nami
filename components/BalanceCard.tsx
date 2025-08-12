import Colors from '@/constants/Colors';
import React from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

type Props = {
  balance: number;
};

export default function BalanceCard({ balance }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>Month Balance</Text>
        <Text style={styles.balance}>
          {balance.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  cardContent: {
    padding: 16,
    backgroundColor: Colors.defaultYellow,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
    color: Colors.background,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.background,
  },
});
