import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import WalletOverview from '@/components/WalletOverview';
import WalletButtons from '@/components/WalletButtons';
import WalletList from '@/components/WalletList';

const dummyWallets = [
  { id: 1, name: 'Main Wallet', amount: 1250.75 },
  { id: 2, name: 'Savings', amount: 5000 },
  { id: 3, name: 'Travel Fund', amount: -150 },
];


export default function WalletScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Wallets' subtitle='Manage your accounts'/>
      <WalletOverview totalBalance={456.87}/>
      <WalletButtons/>
      <WalletList wallets={dummyWallets}/>
    </ScreenContainer>
  );
}
