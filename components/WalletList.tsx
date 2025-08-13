import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet } from 'react-native';
import WalletCard from './WalletCard';

type Wallet = {
  id: number;
  name: string;
  amount: number;
};

type WalletListProps = {
  wallets: Wallet[];
};

export default function WalletList({ wallets }: WalletListProps) {
  return (
    <FlatList
      data={wallets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('View Wallet', `${item.id}-> ${item.name}`)}>
          <WalletCard name={item.name} amount={item.amount} />
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
