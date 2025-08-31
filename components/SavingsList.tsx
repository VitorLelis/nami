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
      keyExtractor={(item) => item.tag_id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Goal', `${item.id}-> ${item.tag_name}`)}>
          <SavingCard name={item.tag_name} icon={item.tag_icon} saved={item.saved} goal={item.goal} />
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