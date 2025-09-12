import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import BudgetCard from './BudgetCard';
import { Budget } from '@/db/useDatabase';
import { router } from 'expo-router';

type BudgetListProps = {
  budgets: Budget[];
};

export default function BudgetList({ budgets }: BudgetListProps) {
  return (
    <FlatList
      data={budgets}
      keyExtractor={(item) => item.tag_id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.navigate(`/budget/${item.id}`)}>
          <BudgetCard name={item.tag_name} icon={item.tag_icon} spent={(item.spent)} limit={item.limit_amount} />
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
