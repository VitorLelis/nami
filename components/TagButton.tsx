import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '@/constants/Colors';

interface Props{
  onPress: () => void
}

export default function TagButton({onPress}:Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <FontAwesome6 name="tag" size={14} color={Colors.defaultYellow} />
        <Text style={styles.text}>TAG LIST</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultGray,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
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
    color: Colors.defaultYellow,
  },
});