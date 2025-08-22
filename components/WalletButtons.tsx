import React from 'react';
import { View } from '@/components/Themed';
import AddWalletButton from './AddWalletButton';
import TransferMoneyButton from './TransferMoneyButton';

interface Props{
  walletPress: () => void;
}

export default function WalletButtons({walletPress}:Props) {
  return (
    <View style={{flexDirection: 'row', paddingBottom: 16}}>
      <View style={{flex:1, marginRight: 8}}>
        <AddWalletButton onPress={walletPress}/>
      </View>
      <View style={{flex: 1}}>
        <TransferMoneyButton/>
      </View>
    </View>
  );
}
