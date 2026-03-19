import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import WalletCard from './WalletCard';
import { WalletBalance } from '@/db/useDatabase';
import { router } from 'expo-router';

type WalletListProps = {
  wallets: WalletBalance[];
  selectedWallets: number[];
  onToggle: (id: number) => void;
};

export default function WalletList({ wallets, selectedWallets, onToggle }: WalletListProps) {
  return (
    <FlatList
      data={wallets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <WalletCard
          walletBalance={item}
          checked={selectedWallets.includes(item.id)}
          onToggle={() => onToggle(item.id)}
        />
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
