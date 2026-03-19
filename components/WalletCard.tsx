import React from 'react';
import { StyleSheet, Pressable} from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import toMoney from '@/utils/toMoney';
import { FontAwesome6 } from '@expo/vector-icons';
import { WalletBalance } from '@/db/useDatabase';
import { router } from 'expo-router';


type WalletCardProps = {
  walletBalance: WalletBalance
  checked: boolean;
  onToggle: () => void;
};

export default function WalletCard({ walletBalance, checked, onToggle }: WalletCardProps) {
  const isNegative = walletBalance.balance < 0;

  return (
    <View style={styles.card}>
      
      <View style={styles.left}>
        <Pressable onPress={onToggle} style={styles.checkbox}>
          <FontAwesome6
            name={checked ? "square-check" : "square"}
            size={22}
            color={Colors.defaultYellow}
          />
        </Pressable>
    
        <Pressable onPress={() => router.navigate(`/wallet/${walletBalance.id}`)}>
          <Text style={styles.name}>{walletBalance.name}</Text>
        </Pressable>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: isNegative ? Colors.expense : Colors.income },
          ]}
        >
          {toMoney(walletBalance.balance)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkbox: {
    marginRight: 2,
    justifyContent: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
