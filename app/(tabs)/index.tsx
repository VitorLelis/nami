
import ScreenTitle from '@/components/ScreenTitle';
import BalanceCard from '@/components/BalanceCard';
import ScreenContainer from '@/components/ScreenContainer';

//Balance of the month here

export default function IndexScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Welcome back!' subtitle="Here's your financial overview" />
      <BalanceCard totalBalance={1000.01}/>
    </ScreenContainer>
  );
}
