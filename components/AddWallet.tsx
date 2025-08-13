import React from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/constants/Colors';

export default function AddWallet() {
  const handlePress = () => {
    Alert.alert('Add Wallet', 'This will open the add wallet option');
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <FontAwesome6 name="plus" size={14} color={Colors.background} />
        <Text style={styles.text}>Add Wallet</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultYellow,
    borderRadius: 14,
    padding: 14,
    marginTop: 14
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.defaultYellow
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    color: Colors.background,
  },
});
