import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import WalletCard from './WalletCard';
import { WalletBalance } from '@/db/useDatabase';
import { router } from 'expo-router';

type WalletListProps = {
  wallets: WalletBalance[];
};

export default function WalletList({ wallets }: WalletListProps) {
  return (
    <FlatList
      data={wallets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.navigate(`/wallet/${item.id}`)}>
          <WalletCard name={item.name} amount={item.balance} />
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
