import React from 'react';
import { StyleSheet, Pressable} from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import toMoney from '@/utils/toMoney';
import { FontAwesome6 } from '@expo/vector-icons';


type WalletCardProps = {
  name: string;
  amount: number;
  checked: boolean;
  onToggle: () => void;
};

export default function WalletCard({ name, amount, checked, onToggle }: WalletCardProps) {
  const isNegative = amount < 0;

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
    
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: isNegative ? Colors.expense : Colors.income },
          ]}
        >
          {toMoney(amount)}
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
