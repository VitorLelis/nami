import React from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/constants/Colors';

export default function TransferMoneyButton() {
  const handlePress = () => {
    Alert.alert('Transfer Money', 'This will take to money transfer');
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <FontAwesome6 name="arrow-right-arrow-left" size={14} color={Colors.background} />
        <Text style={styles.text}>Transfer Money</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultYellow,
    borderRadius: 12,
    padding: 14,
    marginTop: 14
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: Colors.background,
  },
});