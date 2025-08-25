import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Tag, Transaction, useDatabase, Wallet } from '@/db/useDatabase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React from 'react';
import TransactionMonth from '@/components/TransactionMonth';
import { groupTransactions } from '@/utils/groupTransactions';
import { Alert, FlatList, Pressable } from 'react-native';
import { formatMonth } from '@/utils/dateFormat';
import EditDeleteRow from '@/components/EditDeleteRow';
import MessageModal from '@/components/MessageModal';
import EditWalletModal from '@/components/EditWalletModal';
import TagCard from '@/components/TagCard';

//add tag button
//edit and delete tag buttons

export default function TagScreen() {
    const [tagList,setTagList] = useState<Tag[]>([])
    const [editVisible,setEditVisible] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)

  const db = useDatabase();

  async function getTags() {
    const tags = await db.getTagList()
    setTagList(tags)
  }

  useEffect(() => {
      getTags();
    }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      getTags();
    }, []),
  );

  return (
    <ScreenContainer>

      {/*<MessageModal 
        visible={deleteVisible}
        message='DELETE THE WALLET?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />*/}

      <ScreenTitle title= "Tags" subtitle='Manage all your tags'/>

      {/*<EditDeleteRow 
        item="WALLET"
        editPress={() => setEditVisible(true)}
        deletePress={() => setDeleteVisible(true)}
      />*/}

      <FlatList
            data={tagList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TagCard tag={item} 
                onEdit={() => console.log("edit tag")} 
                onDelete={() => console.log("delete tag")} 
              />
              
            )}
            contentContainerStyle={{gap: 12,paddingBottom: 24,}}
            showsVerticalScrollIndicator={false}
          />
    </ScreenContainer>
  );
}