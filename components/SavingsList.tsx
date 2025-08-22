import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import SavingCard from './SavingCard';
import { Saving } from '@/db/useDatabase';

type SavingListProps = {
  savings: Saving[];
};

export default function SavingsList({ savings }: SavingListProps) {
  return (
    <FlatList
      data={savings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Goal', `${item.id}-> ${item.tag}`)}>
          <SavingCard name={item.tag} saved={item.saved} goal={item.goal} />
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