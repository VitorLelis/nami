import React, { useEffect, useState } from 'react';
import { View,Text } from './Themed';
import { Modal, StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Tag, useDatabase } from '@/db/useDatabase';
import { router, useFocusEffect } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPick: (tag: Tag) => void;
}

export default function PickTagModal({ visible, onClose, onPick }: Props) {
  const [tagList,setTagList] = useState<Tag[]>([])

  const db = useDatabase();

  async function getTags() {
    const tags = await db.getTagList()
    setTagList(tags)
  }

  useEffect(() => {
      getTags();
    }, []);

  useFocusEffect(
      React.useCallback(() => {
        getTags();
      }, []),
    );

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>PICK A TAG</Text>
          
            <FlatList
            data={tagList}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onPick(item);
                  onClose();
                }}
              >
                <FontAwesome6 name={item.icon} size={14} color={Colors.lightGray} />
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <Pressable style={styles.card} onPress={() => {
            onClose();router.navigate("/tags")}
            }>
              <Text style={styles.text}>CREATE NEW TAG</Text>
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
    padding: 16,
    alignItems: 'center',
    maxHeight: "50%"
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
  item: {
      width: "100%",
      paddingHorizontal: 18,
      paddingVertical: 16,
      marginVertical: 6, 
      borderRadius: 12, 
      backgroundColor: Colors.progessBar,
      alignItems: "center",
      flexDirection: "row",
    },
  itemText: {
      fontSize: 16,
      fontWeight: "500",
      color: Colors.lightGray,
      marginLeft: 18,
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