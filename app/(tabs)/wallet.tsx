import ScreenTitle from '@/components/ScreenTitle';
import BalanceCard from '@/components/BalanceCard';
import ScreenContainer from '@/components/ScreenContainer';

// Total Balance here

export default function WalletScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Wallets' subtitle='Manage your accounts'/>
      <BalanceCard totalBalance={2000.55}/>
    </ScreenContainer>
  );
}
