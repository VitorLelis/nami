import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Transaction, useDatabase, Wallet } from '@/db/useDatabase';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { FlatList } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';

export default function WalletInfoScreen() {
    const [wallet,setWallet] = useState<Wallet>()
    const [transactionList,setTransactionList] = useState<Transaction[]>([])

  const db = useDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  async function getWalletInfo() {
    const wal = await db.getWallet(Number(params.id))
    const tra = await db.getTransactionsFromWallet(Number(params.id))

    setWallet(wal)
    setTransactionList(tra)
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
      <ScreenTitle title={wallet?.name ?? "Loading..."} subtitle='Wallet history'/>

      <EditDeleteRow 
        item="WALLET"
        editPress={() => console.log("edit item")}
        deletePress={() => console.log("delete item")}
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
            onEdit={() => console.log("edit")}
            onDelete={() => console.log("delete")}
          />
        )}
      />
    </ScreenContainer>
  );
}
