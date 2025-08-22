import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import SavingOverview from '@/components/SavingsOverview';
import AddSavingButton from '@/components/AddSavingButton';
import SavingsList from '@/components/SavingsList';
import { useState } from 'react';
import AddSavingModal from '@/components/AddSavingModal';

export default function SavingsScreen() {
  const [addSavingVisible,setAddSavingVisible] = useState(false);
  
  return (
    <ScreenContainer>
      <ScreenTitle title='Saving Goals' subtitle='Track your financial targets'/>
      <SavingOverview totalGoal={0} totalSaved={0}/>
      <AddSavingButton onPress={()=>setAddSavingVisible(true)}/>

      <AddSavingModal visible={addSavingVisible} onClose={()=>setAddSavingVisible(false)}/>
        
      <SavingsList savings={[]}/>
    </ScreenContainer>
  );
}
