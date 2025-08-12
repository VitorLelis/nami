import ScreenTitle from '@/components/ScreenTitle';
import BalanceCard from '@/components/BalanceCard';
import ScreenContainer from '@/components/ScreenContainer';
import IncomeExpenseRow from '@/components/IncomeExpenseRow';
import OverviewCards from '@/components/OverviewCards';
import RecentTransactions from '@/components/RecentTransactions';

const dummyTransactions = [
  {
    id: 1,
    description: 'Monthly Salary',
    date: '2025-08-01',
    amount: 3500,
  },
  {
    id: 2,
    description: 'Groceries at Supermarket',
    date: '2025-08-03',
    amount: -150,
  },
  {
    id: 3,
    description: 'Electricity Bill',
    date: '2025-08-05',
    amount: -75,
  },
  {
    id: 4,
    description: 'Freelance Project',
    date: '2025-08-07',
    amount: 500.65,
  },
  {
    id: 5,
    description: 'Dinner Out',
    date: '2025-08-09',
    amount: -60,
  },
];


export default function IndexScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Welcome back!' subtitle="Here's your financial overview" />
      <BalanceCard balance={10000.01}/>
      <IncomeExpenseRow income={500} expense={400}/>
      <OverviewCards budgets={4} wallets={3} goals={2} />
      <RecentTransactions recentTransactions={dummyTransactions}/>
    </ScreenContainer>
  );
}
