import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import WalletOverview from '@/components/WalletOverview';
import WalletButtons from '@/components/WalletButtons';
import WalletList from '@/components/WalletList';
import { useEffect, useState } from 'react';
import AddWalletModal from '@/components/AddWalletModal';
import { useDatabase, WalletBalance } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function WalletScreen() {
  const [addWalletVisible,setAddWalletVisible] = useState(false);
  const [totalBalance,setTotalBalance] = useState(0);
  const [walletList,setWalletList] = useState<WalletBalance[]>([]);

  const db = useDatabase();

  async function getWallets() {
    const wallets = await db.getWalletBalanceList();
    setWalletList(wallets)

    const sum: number = wallets.reduce(
      (acc:number,current:WalletBalance) => acc + current.balance,0)
    
    setTotalBalance(sum)
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
    <ScreenContainer>
      <ScreenTitle title='Wallets' subtitle='Manage your accounts'/>
      <WalletOverview totalBalance={totalBalance}/>
      <WalletButtons walletPress={() => setAddWalletVisible(true)}/>
      
      <AddWalletModal 
        visible={addWalletVisible} 
        onClose={() => {
          setAddWalletVisible(false);
          getWallets()}
        }/>

      <WalletList wallets={walletList}/>
    </ScreenContainer>
  );
}
