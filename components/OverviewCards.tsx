import React from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type Props = {
  budgets: number;
  wallets: number;
  goals: number;
};

export default function OverviewCards({ budgets, wallets, goals }: Props) {
  return (
    <View style={styles.grid}>
      {/* Budgets */}
      <View style={[styles.card, {marginRight: 8}]}>
        <View style={styles.cardContent}>
          <FontAwesome6 name="coins" size={20} color={Colors.defaultYellow}/>
          <Text style={styles.value}>{budgets}</Text>
        </View>
      </View>
      
      {/* Wallets */}
      <View style={[styles.card, {marginRight: 8}]}>
        <View style={styles.cardContent}>
          <FontAwesome6 name="wallet" size={20} color={Colors.defaultYellow} />
          <Text style={styles.value}>{wallets}</Text>
        </View>
      </View>

      {/* Goals */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <FontAwesome6 name="piggy-bank" size={20} color={Colors.defaultYellow}/>
          <Text style={styles.value}>{goals}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14
  },
  card: {
    flex: 1,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
  },
  value: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 10
  },
});
