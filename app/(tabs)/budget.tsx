import AddBudgetButton from '@/components/AddBudgetButton';
import AddBudgetModal from '@/components/AddBudgetModal';
import BudgetList from '@/components/BudgetList';
import BudgetOverview from '@/components/BudgetOverview';
import ScreenContainer from '@/components/ScreenContainer';
import ScreenTitle from '@/components/ScreenTitle';
import { Budget, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function BudgetScreen() {
  const [addBudgetVisible,setAddBudgetVisible] = useState(false);
  const [budgetList,setBudgetList] = useState<Budget[]>([]);
  const [totalBudget,setTotalBudget] = useState(0);
  const [totalSpent,setTotalSpent] = useState(0);

  const db = useDatabase();

  async function getBudgets() {
      const budgets = await db.getBudgetList();
      setBudgetList(budgets);
  
      const total: number = budgets.reduce(
        (acc:number,current:Budget) => acc + current.limit_amount,0)

      const spent: number = budgets.reduce(
        (acc:number,current:Budget) => acc + current.spent,0)
      
      setTotalBudget(total);
      setTotalSpent(spent);
  }
  
    useEffect(() => {
        getBudgets();
      }, []);
    
    useFocusEffect(
      React.useCallback(() => {
        getBudgets();
      }, []),
    );

  return (
    <ScreenContainer>
      <ScreenTitle title='Budgets' subtitle='Track your spending limits'/>
      <BudgetOverview totalBudget={totalBudget} totalSpent={totalSpent}/>
      <AddBudgetButton onPress={() => setAddBudgetVisible(true)}/>
      
      <AddBudgetModal 
        visible={addBudgetVisible} 
        onClose={()=> {
          setAddBudgetVisible(false);
          getBudgets();
        }
      }/>

      <BudgetList budgets={budgetList}/>
    </ScreenContainer>
  );
}