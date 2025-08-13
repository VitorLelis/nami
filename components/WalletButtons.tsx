import React from 'react';
import { View } from '@/components/Themed';
import AddWallet from './AddWallet';
import TransferMoney from './TransferMoney';


export default function WalletButtons() {
  return (
    <View style={{flexDirection: 'row', paddingBottom: 16}}>
      <View style={{flex:1, marginRight: 8}}>
        <AddWallet/>
      </View>
      <View style={{flex: 1}}>
        <TransferMoney/>
      </View>
    </View>
  );
}
