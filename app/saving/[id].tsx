import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase, Saving } from '@/db/useDatabase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';
import MessageModal from '@/components/MessageModal';
import EditSavingModal from '@/components/EditSavingModal';

export default function SavingInfoScreen() {
    const [saving,setSaving] = useState<Saving>()
    const [transactionList,setTransactionList] = useState<Transaction[]>([])
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [deleteTransaction,setDeleteTransaction] = useState(false)
    const [deletePick, setDeletePick] = useState<number>()

  const db = useDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  async function getSavingInfo() {
    const sav = await db.getSaving(Number(params.id))
    const tra = await db.getTransactionsFromTag(sav.tag_id)

    setSaving(sav)
    setTransactionList(tra)
  }

  async function handleDelete() {
    try {
      await db.deleteTag(saving!.tag_id);
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
    getSavingInfo()
    setDeleteTransaction(false)
  }

  useEffect(() => {
      getSavingInfo();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getSavingInfo();
    }, []),
  );

  const grouped = groupTransactions(transactionList);
  const monthData = Array.from(grouped.entries());

  return (
    <ScreenContainer>

    {editVisible && saving && (
      <EditSavingModal 
        saving={saving!} 
        visible={editVisible} 
        onClose={() => {
            setEditVisible(false);
            getSavingInfo();
        }}/>
    )}


      <MessageModal 
        visible={deleteTransaction}
        message='DELETE THE TRANSACTION?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteTransaction(false)}
      />

      <MessageModal 
        visible={deleteVisible}
        message='DELETE THE SAVING?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <ScreenTitle title={saving?.tag_name ?? "Loading..."} subtitle='Saving history'/>

      <EditDeleteRow 
        item="SAVING"
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
            balance={Math.abs(balance)}
            onDelete={(id)=> {setDeletePick(id);setDeleteTransaction(true)}}
          />
        )}
      />
    </ScreenContainer>
  );
}
