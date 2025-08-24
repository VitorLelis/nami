import React from 'react';
import { View } from '@/components/Themed';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

interface Props{
  item: string
  editPress: () => void;
  deletePress: () => void;
}

export default function EditDeleteRow({item, editPress,deletePress}:Props) {
  return (
    <View style={{flexDirection: 'row', paddingBottom: 16}}>
      <View style={{flex:1, marginRight: 8}}>
        <EditButton item={item} onPress={editPress}/>
      </View>
      <View style={{flex: 1}}>
        <DeleteButton item ={item} onPress={deletePress}/>
      </View>
    </View>
  );
}