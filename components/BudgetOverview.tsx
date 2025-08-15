import React from "react";
import { Text, View } from '@/components/Themed';
import { StyleSheet } from "react-native";
import FontAwesome6  from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";
import toMoney from "@/utils/toMoney";

type BudgetOverviewProps = {
  totalBudget: number;
  totalSpent: number;
};

export default function BudgetOverview({ totalBudget, totalSpent }: BudgetOverviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name="coins" size={20} color={Colors.text} />
        <Text style={styles.title}>Budgets Overview</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={[styles.amount, { color: Colors.defaultYellow }]}>
            {toMoney(totalBudget)}
          </Text>
          <Text style={styles.label}>Total Budget</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.amount, { color: Colors.expense }]}>
            {toMoney(totalSpent)}
          </Text>
          <Text style={styles.label}>Total Spent</Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 15,
  },
  content: {
    marginTop:8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    alignItems: "center",
  },
  amount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    marginTop:4,
    color: Colors.lightGray,
  },
});
