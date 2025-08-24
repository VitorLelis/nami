import React from 'react';
import { View } from '@/components/Themed';
import TransferMoneyButton from './TransferMoneyButton';
import AddButton from './AddButton';

interface Props{
  walletPress: () => void;
}

export default function WalletButtons({walletPress}:Props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex:1, marginRight: 8}}>
        <AddButton item="WALLET" onPress={walletPress}/>
      </View>
      <View style={{flex: 1}}>
        <TransferMoneyButton/>
      </View>
    </View>
  );
}
