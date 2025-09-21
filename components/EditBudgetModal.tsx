import React, { useState } from 'react';
import { View,Text } from './Themed';
import { Modal, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import Colors from '@/constants/Colors';
import { Budget, useDatabase } from '@/db/useDatabase';
import IconPicker from './IconPicker';

interface Props {
  budget: Budget;
  visible: boolean;
  onClose: () => void;
}

export default function EditBudgetModal({ budget, visible, onClose }: Props) {
  const [tagName, setTagName] = useState(budget?.tag_name ??'');
  const [tagIcon, setTagIcon] = useState(budget?.tag_icon ?? 'tag');
  const [limitInput, setLimitInput] = useState(budget?.limit_amount.toString() ?? '');

  const db = useDatabase();

  const handlePress = async () => {
    try {
        if (isNaN(Number(limitInput))){
          Alert.alert('Error', 'It must be a Number!');  
        }

        await db.updateTag(budget.tag_id,tagName,tagIcon)   
        await db.updateBudget(budget.id,Number(limitInput))
      
    } catch (error) {
      Alert.alert('Error', String(error));
    }

    setTagName('');
    setLimitInput('');
    setTagIcon('tag');
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
          <Text style={styles.title}>EDIT BUDGET</Text>
          <TextInput
            style={styles.input}
            value={tagName}
            placeholder='Budget name (Tag)'
            placeholderTextColor={Colors.subtitle}
            onChangeText={setTagName}
          />
          <TextInput
            style={styles.input}
            value={limitInput}
            placeholder='Set the limit'
            placeholderTextColor={Colors.subtitle}
            onChangeText={setLimitInput}
            keyboardType="numeric"
          />

          <IconPicker selectedIcon={tagIcon} onSelect={setTagIcon}/>

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
    maxHeight: '80%',
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
