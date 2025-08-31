import React, { useState } from 'react';
import { View, Text } from './Themed';
import { Modal, TextInput, StyleSheet, Pressable, Alert, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useDatabase } from '@/db/useDatabase';
import IconPicker from './IconPicker';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AddTagModal({ visible, onClose }: Props) {
  const [tagName, setTagName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('tag');
  const db = useDatabase();

  const handlePress = async () => {
    try {
      await db.addTag(tagName, selectedIcon,);
    } catch (error) {
      Alert.alert('Error', String(error));
    }

    setTagName('');
    setSelectedIcon('tag');
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>ADD TAG</Text>

          {/* Input */}
          <TextInput
            style={styles.input}
            value={tagName}
            placeholder="Tag name"
            placeholderTextColor={Colors.subtitle}
            onChangeText={setTagName}
          />
          
          <IconPicker selectedIcon={selectedIcon} onSelect={setSelectedIcon}/>

          {/* Submit */}
          <Pressable style={styles.card} onPress={handlePress}>
            <Text style={styles.text}>SUBMIT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Colors.defaultGray,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  input: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.progessBar,
    padding: 10,
    marginBottom: 15,
    color: Colors.lightGray,
  },
  card: {
    backgroundColor: Colors.defaultYellow,
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.background,
  },
});
