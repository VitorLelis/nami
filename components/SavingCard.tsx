import React from "react";
import { Text, View } from '@/components/Themed';
import { StyleSheet } from "react-native";
import toMoney from "@/utils/toMoney";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";

type SavingCardProps = {
    name: string;
    icon: string;
    saved: number;
    goal: number;
};

export default function SavingCard({ name,icon, saved,goal }: SavingCardProps) {
  const percentage = (saved / goal) * 100

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome6 name={icon} size={14} color={Colors.text} />
        <Text style={styles.title}>{name}</Text>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.spent}>
          {toMoney(saved)} saved
        </Text>
        <Text style={styles.muted}>of {toMoney(goal)}</Text>
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
              percentage >= 100
              ? styles.green
              : styles.default,
          ]}
        >
          {percentage.toFixed(1)}% saved
        </Text>
        <Text style={styles.bold}>
          Need {toMoney(Math.max(goal-saved, 0))} more to reach goal
        </Text>
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
    marginLeft:10,
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
    color: Colors.text
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