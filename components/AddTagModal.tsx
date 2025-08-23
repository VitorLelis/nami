import React, { useState } from 'react';
import { View,Text } from './Themed';
import { Modal, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import Colors from '@/constants/Colors';
import { Tag, useDatabase } from '@/db/useDatabase';

interface Props {
  visible: boolean;
  onCreate: (tag: Tag) => void;
  onClose: () => void;
}

export default function AddTagModal({ visible, onClose, onCreate }: Props) {
  const [inputValue, setInputValue] = useState('');

  const db = useDatabase();

  const handlePress = async () => {
    try {
      const response = await db.addTag(inputValue); 

        const myTag: Tag = {
          id: response.insertedRowId,
          name: inputValue,
        };

        onCreate(myTag)
    } catch (error) {
      Alert.alert('Error', String(error));
    }

    setInputValue('');
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>ADD TAG</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            placeholder='Tag name'
            placeholderTextColor={Colors.subtitle}
            onChangeText={setInputValue}
          />
          <Pressable style={styles.card} onPress={handlePress}>
              <Text style={styles.text}>SUBMIT</Text>
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
  input: {
    width: '100%',
    borderRadius: 5,
    backgroundColor:Colors.progessBar,
    padding: 10,
    marginBottom: 15,
    color: Colors.lightGray
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