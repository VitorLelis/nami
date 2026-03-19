import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase, Tag } from '@/db/useDatabase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';
import MessageModal from '@/components/MessageModal';
import EditTagModal from '@/components/EditTagModal';

export default function TagInfoScreen() {
    const [tag,setTag] = useState<Tag>()
    const [transactionList,setTransactionList] = useState<Transaction[]>([])
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [deleteTransaction,setDeleteTransaction] = useState(false)
    const [deletePick, setDeletePick] = useState<number>()

  const db = useDatabase();
  const params = useLocalSearchParams<{ id: string }>();
  const tag_id = Number(params.id)

  async function getTagInfo() {
    const tg = await db.getTag(tag_id)
    const tra = await db.getTransactionsFromTag(tag_id)

    setTag(tg)
    setTransactionList(tra)
  }

  async function handleDelete() {
    try {
      await db.deleteTag(tag!.id);
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
    getTagInfo()
    setDeleteTransaction(false)
  }

  useEffect(() => {
      getTagInfo();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getTagInfo();
    }, []),
  );

  const grouped = groupTransactions(transactionList);
  const monthData = Array.from(grouped.entries());

  return (
    <ScreenContainer>

    {editVisible && tag && (
        <EditTagModal    
          tag={tag}
          visible={editVisible}
          onClose={() => {
            setEditVisible(false);
            getTagInfo();
          }}
        />
    )}

      <MessageModal 
        visible={deleteTransaction}
        message='DELETE THE TRANSACTION?'
        buttonText='DELETE'
        onPress={handleDeleteTransaction}
        onClose={() => setDeleteTransaction(false)}
      />

      <MessageModal 
        visible={deleteVisible}
        message='DELETE THE TAG?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <ScreenTitle title={tag?.name ?? "Loading..."} subtitle='Tag history'/>

      <EditDeleteRow 
        item="TAG"
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
