import React, { useEffect, useState } from 'react';
import { View,Text } from './Themed';
import { Modal, StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Wallet, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';

interface Props {
  visible: boolean;
  onClose: () => void;
  onPick: (wallet: Wallet) => void;
}

export default function PickWalletModal({ visible, onClose, onPick }: Props) {
  const [walletList,setWalletList] = useState<Wallet[]>([])

  const db = useDatabase();

  async function getWallets() {
    const wallets = await db.getWalletList()
    setWalletList(wallets)
  }

  useEffect(() => {
      getWallets();
    }, []);

  useFocusEffect(
      React.useCallback(() => {
        getWallets();
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
          <Text style={styles.title}>PICK A WALLET</Text>
          
            <FlatList
            data={walletList}
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
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
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
      paddingHorizontal: 58,
      paddingVertical: 16,
      marginVertical: 6, 
      borderRadius: 12, 
      backgroundColor: Colors.progessBar,
      alignItems: "center",
    },
  itemText: {
      fontSize: 16,
      fontWeight: "500",
      color: Colors.lightGray,
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