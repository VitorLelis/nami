import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase, Budget } from '@/db/useDatabase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';
import MessageModal from '@/components/MessageModal';
import EditBudgetModal from '@/components/EditBudgetModal';

export default function BudgetInfoScreen() {
    const [budget,setBudget] = useState<Budget>()
    const [transactionList,setTransactionList] = useState<Transaction[]>([])
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)

  const db = useDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  async function getBudgetInfo() {
    const bud = await db.getBudget(Number(params.id))
    const tra = await db.getTransactionsFromTag(bud.tag_id)

    setBudget(bud)
    setTransactionList(tra)
  }

  async function handleDelete() {
    try {
      await db.deleteTag(budget!.tag_id);
    } catch (error) {
      Alert.alert('Error', String(error));
    }
    setDeleteVisible(false)
    router.back()
  }

  useEffect(() => {
      getBudgetInfo();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getBudgetInfo();
    }, []),
  );

  const grouped = groupTransactions(transactionList);
  const monthData = Array.from(grouped.entries());

  return (
    <ScreenContainer>
      <EditBudgetModal 
        budget={budget!} 
        visible={editVisible} 
        onClose={() => {
            setEditVisible(false);
            getBudgetInfo();
        }}/>

      <MessageModal 
        visible={deleteVisible}
        message='DELETE THE BUDGET?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <ScreenTitle title={budget?.tag_name ?? "Loading..."} subtitle='Budget history'/>

      <EditDeleteRow 
        item="BUDGET"
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
            balance={budget!.limit_amount - Math.abs(balance)}
            onEdit={() => console.log("edit")}
            onDelete={() => console.log("delete")}
          />
        )}
      />
    </ScreenContainer>
  );
}
