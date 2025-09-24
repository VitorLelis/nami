import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import EditTransactionInfo from '@/components/EditTransactionInfo';
import { useEffect, useState } from 'react';
import { Tag, Transaction, useDatabase, Wallet } from '@/db/useDatabase';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function EditTransactionScreen() {
    const [transaction,setTransaction] = useState<Transaction>()
    const [wallet,setWallet] = useState<Wallet>()
    const [tag,setTag] = useState<Tag>()
    const [type, setType] = useState<"income" | "expense">("expense");

    const db = useDatabase();
    const params = useLocalSearchParams<{ id: string }>();

    async function getTransactionsInfo() {
        const tra = await db.getTransaction(Number(params.id))
        const wal = await db.getWallet(tra.wallet_id)
        const tg = await db.getTag(tra.tag_id)
        const tp = tra.value >= 0 ? 'income' : 'expense'

        setTransaction(tra);
        setWallet(wal)
        setTag(tg)
        setType(tp)
    }

    useEffect(() => {
          getTransactionsInfo();
        }, []);
      
      useFocusEffect(
        React.useCallback(() => {
          getTransactionsInfo();
        }, []),
      );

  return (
    <ScreenContainer>
      <ScreenTitle title='Edit Transaction' subtitle='Update your income or expense'/>
      {transaction &&  wallet && tag && type &&
      (<EditTransactionInfo 
        transaction={transaction} 
        pickedWallet={wallet} 
        pickedTag={tag} 
        type={type}
      />
      )}
    </ScreenContainer>
  );
}