import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import MessageModal from '@/components/MessageModal';

export default function AllTransactionsScreen() {
    const [transactionList,setTransactionList] = useState<Transaction[]>([])
    const [deleteTransaction,setDeleteTransaction] = useState(false)
    const [deletePick, setDeletePick] = useState<number>()

  const db = useDatabase();

  async function getAllTransactions() {
    const tra = await db.getAllTransactions()

    setTransactionList(tra)
  }

  async function handleDeleteTransaction() {
    try {
      await db.deleteTransaction(deletePick!)
    } catch (error) {
      Alert.alert('Error', String(error));
    }
    getAllTransactions()
    setDeleteTransaction(false)
  }

  useEffect(() => {
      getAllTransactions();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getAllTransactions();
    }, []),
  );

  const grouped = groupTransactions(transactionList);
  const monthData = Array.from(grouped.entries());

  return (
    <ScreenContainer>

      <MessageModal 
        visible={deleteTransaction}
        message='DELETE THE TRANSACTION?'
        buttonText='DELETE'
        onPress={handleDeleteTransaction}
        onClose={() => setDeleteTransaction(false)}
      />

      <ScreenTitle title={"All Transactions"} subtitle='Complete history'/>

      <FlatList
        data={monthData}
        keyExtractor={([month]) => month}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: [month, { transactions, balance }] }) => (
          <TransactionMonth
            title={formatMonth(month)}
            transactions={transactions}
            balance={Math.abs(balance)}
            onDelete={(id)=> {setDeletePick(id);setDeleteTransaction(true)}}
          />
        )}
      />
    </ScreenContainer>
  );
}
