import Colors from '@/constants/Colors';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import toMoney from '@/utils/toMoney';

type Props = {
  income: number;
  expense: number;
};

export default function IncomeExpenseRow({ income, expense }: Props) {
  return (
    <View style={styles.rowContainer}>
      {/* Income Card */}
      <View style={[styles.card, {marginRight: 10}]}>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <FontAwesome6 name="circle-arrow-up" size={24} color={Colors.income} />
            <Text style={[styles.amount, { color: Colors.income }]}>{toMoney(income)}</Text>
          </View>
        </View>
      </View>

      {/* Expense Card */}
      <View style={[styles.card, {marginLeft: 0}]}>
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <FontAwesome6 name="circle-arrow-down" size={24} color={Colors.expense} />
            <Text style={[styles.amount, { color: Colors.expense }]}>{toMoney(expense)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.defaultGray,
  },
  cardContent: {
    padding: 18,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '600',
    marginLeft: 28,
    fontSize: 18,
  },
});
