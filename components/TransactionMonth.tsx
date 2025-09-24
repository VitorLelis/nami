import { Transaction, useDatabase } from "@/db/useDatabase";
import React, { useState } from "react";
import { Text,View } from "./Themed";
import { Alert, FlatList, StyleSheet } from "react-native";
import TransactionCard from "./TransactionCard";
import Colors from "@/constants/Colors";
import toMoney from "@/utils/toMoney";
import MessageModal from "./MessageModal";
import { router } from "expo-router";

type Props = {
  transactions: Transaction[];
  title: string;
  balance: number;
  onDelete: (id: number) => void;
};

export default function TransactionMonth({ transactions, title, balance, onDelete }: Props) { 
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{title}</Text>
        <Text style={[styles.balance, { color: balance >= 0 ? Colors.income : Colors.expense }]}>
          {toMoney(balance)}
        </Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TransactionCard transaction={item} onDelete={onDelete}/>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    flex: 1,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
  },
  balance: {
    fontSize: 16,
    fontWeight: "600",
  },
});

