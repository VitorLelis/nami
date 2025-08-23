import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import AddTransactionInfo from '@/components/AddTransactionInfo';

export default function NewTransactionScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Add Transaction' subtitle='Record your income or expense'/>
      <AddTransactionInfo/>
    </ScreenContainer>
  );
}
