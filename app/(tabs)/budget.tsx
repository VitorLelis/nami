import BudgetOverview from '@/components/BudgetOverview';
import ScreenContainer from '@/components/ScreenContainer';
import ScreenTitle from '@/components/ScreenTitle';

export default function BudgetScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Budgets' subtitle='Track your spending limits'/>
      <BudgetOverview totalBudget={1000} totalSpent={200}/>
    </ScreenContainer>
  );
}