import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import {Octicons, FontAwesome6} from '@expo/vector-icons';
import toMoney from '@/utils/toMoney';

type Transaction = {
  id: number;
  description: string;
  date: string;
  amount: number;
};

type Props = {
  recentTransactions: Transaction[];
};

export default function RecentTransactions({ recentTransactions }: Props) {
  const renderItem = ({ item }: { item: Transaction }) => {
    const isIncome = item.amount >= 0;

    return (
      <View style={styles.transactionRow}>
        {/* Left side: Icon + Description */}
        <View style={styles.leftSide}>
          <View style={styles.iconContainer}>
            {isIncome ? (
              <FontAwesome6 name="circle-arrow-up" size={16} color={Colors.income} />
            ) : (
              <FontAwesome6 name="circle-arrow-down" size={16} color={Colors.expense} />
            )}
          </View>
          <View>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>

        {/* Right side: Amount */}
        <Text
          style={[
            styles.amount,
            { color: isIncome ? Colors.income : Colors.expense },
          ]}
        >
          {toMoney(item.amount)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Octicons name="graph" size={20} color={Colors.text} />
        <Text style={styles.headerTitle}>Recent Transactions</Text>
      </View>

      {/* Transactions list */}
      <FlatList
        data={recentTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: Colors.defaultGray,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.defaultGray,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.defaultGray,
  },
  iconContainer: {
    padding: 6,
    marginRight: 6,
    backgroundColor: Colors.defaultGray,
  },
  description: {
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: Colors.defaultGray,
  },
  date: {
    fontSize: 12,
    color: Colors.subtitle,
    backgroundColor: Colors.defaultGray,
  },
  amount: {
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    height: 12,
    backgroundColor: Colors.defaultGray,
  },
});
