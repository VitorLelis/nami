import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import SavingCard from './SavingCard';

type Saving = {
  id: number;
  name: string;
  saved: number;
  goal: number;
};

type SavingListProps = {
  savings: Saving[];
};

export default function SavingsList({ savings }: SavingListProps) {
  return (
    <FlatList
      data={savings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Goal', `${item.id}-> ${item.name}`)}>
          <SavingCard name={item.name} saved={item.saved} goal={item.goal} />
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