import AddBudgetButton from '@/components/AddBudgetButton';
import AddBudgetModal from '@/components/AddBudgetModal';
import BudgetList from '@/components/BudgetList';
import BudgetOverview from '@/components/BudgetOverview';
import ScreenContainer from '@/components/ScreenContainer';
import ScreenTitle from '@/components/ScreenTitle';
import { useState } from 'react';

export default function BudgetScreen() {
  const [addBudgetVisible,setAddBudgetVisible] = useState(false);

  return (
    <ScreenContainer>
      <ScreenTitle title='Budgets' subtitle='Track your spending limits'/>
      <BudgetOverview totalBudget={0} totalSpent={0}/>
      <AddBudgetButton onPress={() => setAddBudgetVisible(true)}/>
      
      <AddBudgetModal visible={addBudgetVisible} onClose={()=> setAddBudgetVisible(false)}/>

      <BudgetList budgets={[]}/>
    </ScreenContainer>
  );
}