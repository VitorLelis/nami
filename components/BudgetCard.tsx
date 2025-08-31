import React from "react";
import { Text, View } from '@/components/Themed';
import { StyleSheet } from "react-native";
import toMoney from "@/utils/toMoney";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";

type BudgetCardProps = {
    name: string;
    icon: string;
    spent: number;
    limit: number;
};

export default function BudgetCard({ name, icon, spent,limit }: BudgetCardProps) {
  const spentValue = Math.max(-spent ,0) // avoid positive values and keep the percentage correct
  const isOverBudget = spentValue > limit;
  const percentage = limit != 0? (spentValue / limit) * 100 : 100 // avoid division by zero

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name={icon} size={14} color={Colors.text} />
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={[styles.spent, isOverBudget ? styles.red : styles.default]}>
          {toMoney(spentValue)} spent
        </Text>
        <Text style={styles.muted}>of {toMoney(limit)}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: Colors.defaultYellow
            },
          ]}
        />
      </View>

      <View style={styles.footer}>
        <Text
          style={[
            styles.percentage,
            isOverBudget
              ? styles.red
              : percentage >= 80
              ? styles.yellow
              : styles.green,
          ]}
        >
          {percentage.toFixed(1)}% used
        </Text>
        {isOverBudget && (
          <Text style={[styles.red, styles.bold]}>
            {toMoney(spentValue - limit)} over budget
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    padding: 16,
  },
  header: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  spent: {
    fontSize: 14,
  },
  muted: {
    fontSize: 14,
    color: Colors.lightGray,
  },
  default: {
    color: Colors.text,
  },
  red: {
    color: Colors.excess,
  },
  yellow: {
    color: Colors.warning,
  },
  green: {
    color: Colors.safe,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.progessBar,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentage: {
    fontSize: 12,
    fontWeight: "500",
  },
  bold: {
    fontWeight: "500",
    fontSize: 12,
  },
});
