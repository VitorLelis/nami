import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import TransferDetails from '@/components/TransferDetails';

export default function TransferScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Transfer Money' subtitle='Move your money between Wallets'/>
      <TransferDetails/>
    </ScreenContainer>
  );
}