import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import SavingOverview from '@/components/SavingsOverview';
import AddSavingButton from '@/components/AddSavingButton';
import SavingsList from '@/components/SavingsList';
import { useEffect, useState } from 'react';
import AddSavingModal from '@/components/AddSavingModal';
import { Saving, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function SavingsScreen() {
  const [addSavingVisible,setAddSavingVisible] = useState(false);
  const [savingList,setSavingList] = useState<Saving[]>([])
  const [totalGoal,setTotalGoal] = useState(0)
  const [totalSaved,setTotalSaved] = useState(0)

  const db = useDatabase();

  async function getSavings() {
    const savings = await db.getSavingList();

    setSavingList(savings)

    const total: number = savings.reduce(
      (acc:number,current:Saving) => acc + current.goal,0)
    
    const saved: number = savings.reduce(
      (acc:number,current:Saving) => acc + current.saved,0)
          
    setTotalGoal(total);
    setTotalSaved(saved)
  }

  useEffect(() => {
      getSavings();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getSavings();
    }, []),
  );
  
  return (
    <ScreenContainer>
      <ScreenTitle title='Saving Goals' subtitle='Track your financial targets'/>
      <SavingOverview totalGoal={totalGoal} totalSaved={totalSaved}/>
      <AddSavingButton onPress={()=>setAddSavingVisible(true)}/>

      <AddSavingModal 
        visible={addSavingVisible} 
        onClose={()=>{
          setAddSavingVisible(false);
          getSavings();
        }
      }/>
        
      <SavingsList savings={savingList}/>
    </ScreenContainer>
  );
}
