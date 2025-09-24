import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase, Wallet } from '@/db/useDatabase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';
import MessageModal from '@/components/MessageModal';
import EditWalletModal from '@/components/EditWalletModal';

export default function WalletInfoScreen() {
    const [wallet,setWallet] = useState<Wallet>()
    const [transactionList,setTransactionList] = useState<Transaction[]>([])
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [deleteTransaction,setDeleteTransaction] = useState(false)
    const [deletePick, setDeletePick] = useState<number>()

  const db = useDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  async function getWalletInfo() {
    const wal = await db.getWallet(Number(params.id))
    const tra = await db.getTransactionsFromWallet(Number(params.id))

    setWallet(wal)
    setTransactionList(tra)
  }

  async function handleDelete() {
    try {
      await db.deleteWallet(Number(params.id));
    } catch (error) {
      Alert.alert('Error', String(error));
    }
    setDeleteVisible(false)
    router.back()
  }

  async function handleDeleteTransaction() {
    try {
      await db.deleteTransaction(deletePick!)
    } catch (error) {
      Alert.alert('Error', String(error));
    }
    getWalletInfo()
    setDeleteTransaction(false)
  }

  useEffect(() => {
      getWalletInfo();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getWalletInfo();
    }, []),
  );

  const grouped = groupTransactions(transactionList);
  const monthData = Array.from(grouped.entries());

  return (
    <ScreenContainer>
      <EditWalletModal
        wallet={wallet!}
        visible={editVisible}
        onClose={() => {
          setEditVisible(false);
          getWalletInfo();
        }
        }
      />

      <MessageModal 
        visible={deleteVisible}
        message='DELETE THE WALLET?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <MessageModal 
        visible={deleteTransaction}
        message='DELETE THE TRANSACTION?'
        buttonText='DELETE'
        onPress={handleDeleteTransaction}
        onClose={() => setDeleteTransaction(false)}
      />

      <ScreenTitle title={wallet?.name ?? "Loading..."} subtitle='Wallet history'/>

      <EditDeleteRow 
        item="WALLET"
        editPress={() => setEditVisible(true)}
        deletePress={() => setDeleteVisible(true)}
      />

      <FlatList
        data={monthData}
        keyExtractor={([month]) => month}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: [month, { transactions, balance }] }) => (
          <TransactionMonth
            title={formatMonth(month)}
            transactions={transactions}
            balance={balance}
            onDelete={(id)=> {setDeletePick(id);setDeleteTransaction(true)}}
          />
        )}
      />
    </ScreenContainer>
  );
}
