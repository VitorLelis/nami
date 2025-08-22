import ScreenTitle from '@/components/ScreenTitle';
import BalanceCard from '@/components/BalanceCard';
import ScreenContainer from '@/components/ScreenContainer';
import IncomeExpenseRow from '@/components/IncomeExpenseRow';
import OverviewCards from '@/components/OverviewCards';
import RecentTransactions from '@/components/RecentTransactions';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Transaction, useDatabase } from '@/db/useDatabase';


export default function IndexScreen() {
  const [monthBalance,setMonthBalance] = useState(0);
  const [monthIncome,setMonthIncome] = useState(0);
  const [monthExpense,setMonthExpense] = useState(0);
  const [budgetCount,setBudgetCount] = useState(0);
  const [walletCount,setWalletCount] = useState(0);
  const [savingsCount,setSavingsCount] = useState(0);
  const [recentTransactions,setRecentTransactions] = useState<Transaction[]>([])

  const db = useDatabase();

  const handleTransactions = (trs: Transaction[]) => {
    setRecentTransactions(trs.slice(0,5))

    let income = 0;
    let expense = 0;

    for (let t of trs){
      t.value >= 0 ? income += t.value : expense += t.value;
    }

    setMonthBalance(income+expense)
    setMonthIncome(income)
    setMonthExpense(expense)
  }

  async function getVariables() {
    try {
      const monthTransactions = await db.getMonthTransactions();
      const budgetResponse = await db.getBudgetCount();
      const walletResponse = await db.getWalletCount();
      const savingResponse = await db.getSavingsCount();

      setBudgetCount(budgetResponse)
      setWalletCount(walletResponse)
      setSavingsCount(savingResponse)

      handleTransactions(monthTransactions)
    } 
    catch (error) {
      Alert.alert('Error', String(error));
    }
  }

  useEffect(() => {
    getVariables();
  }, []);
  
  return (
    <ScreenContainer>
      <ScreenTitle title='Welcome back!' subtitle="Here's your financial overview" />
      <BalanceCard balance={monthBalance}/>
      <IncomeExpenseRow income={monthIncome} expense={monthExpense}/>
      <OverviewCards budgets={budgetCount} wallets={walletCount} goals={savingsCount} />
      <RecentTransactions recentTransactions={recentTransactions}/>
    </ScreenContainer>
  );
}
