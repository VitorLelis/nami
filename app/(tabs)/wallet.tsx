import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import WalletOverview from '@/components/WalletOverview';
import WalletButtons from '@/components/WalletButtons';
import WalletList from '@/components/WalletList';
import { useState } from 'react';
import AddWalletModal from '@/components/AddWalletModal';

export default function WalletScreen() {
  const [addWalletVisible,setAddWalletVisible] = useState(false);

  return (
    <ScreenContainer>
      <ScreenTitle title='Wallets' subtitle='Manage your accounts'/>
      <WalletOverview totalBalance={0}/>
      <WalletButtons walletPress={() => setAddWalletVisible(true)}/>
      
      <AddWalletModal visible={addWalletVisible} onClose={() => setAddWalletVisible(false)}/>

      <WalletList wallets={[]}/>
    </ScreenContainer>
  );
}
