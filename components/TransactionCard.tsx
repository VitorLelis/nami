import React from "react";
import { Text, View } from "./Themed";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Transaction } from "@/db/useDatabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";
import toMoney from "@/utils/toMoney";
import { formatDate } from "@/utils/dateFormat";

type Props = {
  transaction: Transaction;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TransactionCard({ transaction, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.textContainer}>
          <View style={styles.titleIcon}>
            <FontAwesome6 name={transaction.tag_icon} size={14} color={Colors.text} />
            <Text style={styles.description}>{transaction.desc}</Text>
          </View>
          <Text style={styles.subText}>
            {transaction.tag_name} • {transaction.wallet_name} • {formatDate(transaction.date)}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: transaction.value >= 0 ? Colors.income : Colors.expense }]}>
          {toMoney(transaction.value)}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(transaction.id)} style={styles.actionBtn}>
            <FontAwesome6 name="edit" size={16} color={Colors.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(transaction.id)} style={styles.actionBtn}>
            <FontAwesome6 name="trash-can" size={16} color={Colors.lightGray} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: Colors.defaultGray,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  description: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 8,
  },
  subText: {
    fontSize: 12,
    color: Colors.lightGray,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "700",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    marginTop: 4,
  },
  actionBtn: {
    marginLeft: 6,
    padding: 4,
  },
});
