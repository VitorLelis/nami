import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import SavingOverview from '@/components/SavingsOverview';
import AddSaving from '@/components/AddSavings';
import SavingsList from '@/components/SavingsList';

const dummySavings = [
  { id: 1, name: "PS6", saved: 320, goal: 400 },
  { id: 2, name: "Paris", saved: 180, goal: 150 },
  { id: 3, name: "Dog", saved: 100, goal: 100 },
];

export default function SavingsScreen() {
  return (
    <ScreenContainer>
      <ScreenTitle title='Saving Goals' subtitle='Track your financial targets'/>
      <SavingOverview totalGoal={10000} totalSaved={5667}/>
      <AddSaving/>
      <SavingsList savings={dummySavings}/>
    </ScreenContainer>
  );
}
