import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import BudgetCard from './BudgetCard';

type Budget = {
  id: number;
  name: string;
  spent: number;
  limit: number;
};

type BudgetListProps = {
  budgets: Budget[];
};

export default function BudgetList({ budgets }: BudgetListProps) {
  return (
    <FlatList
      data={budgets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Budget', `${item.id}-> ${item.name}`)}>
          <BudgetCard name={item.name} spent={item.spent} limit={item.limit} />
        </Pressable>
        
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 24,
  },
});
