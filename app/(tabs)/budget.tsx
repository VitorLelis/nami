import AddBudget from '@/components/AddBudget';
import BudgetList from '@/components/BudgetList';
import BudgetOverview from '@/components/BudgetOverview';
import ScreenContainer from '@/components/ScreenContainer';
import ScreenTitle from '@/components/ScreenTitle';

const dummyBudgets = [
  { id: 1, name: "Groceries", spent: 320, limit: 400 },
  { id: 2, name: "Entertainment", spent: 180, limit: 150 },
  { id: 3, name: "Transport", spent: 60, limit: 100 },
  { id: 4, name: "Utilities", spent: 200, limit: 200 },
];

export default function BudgetScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Budgets' subtitle='Track your spending limits'/>
      <BudgetOverview totalBudget={1000} totalSpent={200}/>
      <AddBudget/>
      <BudgetList budgets={dummyBudgets}/>
    </ScreenContainer>
  );
}