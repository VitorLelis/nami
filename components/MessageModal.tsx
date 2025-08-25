import React from 'react';
import { View,Text } from './Themed';
import { Modal, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/Colors';

interface Props {
  visible: boolean;
  message: string;
  buttonText: string
  onPress: () => void,
  onClose: () => void;
}

export default function MessageModal({ visible, message,buttonText,onPress, onClose }: Props) {

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{message}</Text>
          <Pressable style={styles.card} onPress={onPress}>
              <Text style={styles.text}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.defaultGray,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  card: {
      backgroundColor: Colors.defaultYellow,
      borderRadius: 12,
      padding: 14,
      marginTop: 14
  },
  text: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.background,
  },
});