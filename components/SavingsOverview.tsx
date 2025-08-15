import React from "react";
import { Text, View } from '@/components/Themed';
import { StyleSheet } from "react-native";
import FontAwesome6  from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";
import toMoney from "@/utils/toMoney";

type SavingOverviewProps = {
  totalGoal: number;
  totalSaved: number;
};

export default function SavingOverview({ totalGoal, totalSaved }: SavingOverviewProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name="piggy-bank" size={20} color={Colors.text} />
        <Text style={styles.title}>Savings Overview</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={[styles.amount, { color: Colors.defaultYellow }]}>
            {toMoney(totalGoal)}
          </Text>
          <Text style={styles.label}>Total Goal</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.amount, { color: Colors.income }]}>
            {toMoney(totalSaved)}
          </Text>
          <Text style={styles.label}>Total Saved</Text>
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