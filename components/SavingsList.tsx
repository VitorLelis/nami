import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import SavingCard from './SavingCard';
import { Saving } from '@/db/useDatabase';
import { router } from 'expo-router';

type SavingListProps = {
  savings: Saving[];
};

export default function SavingsList({ savings }: SavingListProps) {
  return (
    <FlatList
      data={savings}
      keyExtractor={(item) => item.tag_id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.navigate(`/saving/${item.id}`)}>
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