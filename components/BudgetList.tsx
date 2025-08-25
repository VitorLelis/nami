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
      keyExtractor={(item) => item.tag_id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Budget', `${item.id}-> ${item.tag_name}`)}>
          <BudgetCard name={item.tag_name} spent={Math.abs(item.spent)} limit={item.limit_amount} />
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
