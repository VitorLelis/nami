import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import BudgetCard from './BudgetCard';
import { Budget } from '@/db/useDatabase';

type BudgetListProps = {
  budgets: Budget[];
};

export default function BudgetList({ budgets }: BudgetListProps) {
  return (
    <FlatList
      data={budgets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Budget', `${item.id}-> ${item.tag}`)}>
          <BudgetCard name={item.tag} spent={item.spent} limit={item.limit_amount} />
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
