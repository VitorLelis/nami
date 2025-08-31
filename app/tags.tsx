import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Tag, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import TagCard from '@/components/TagCard';
import AddButton from '@/components/AddButton';
import AddTagModal from '@/components/AddTagModal';

export default function TagScreen() {
    const [tagList,setTagList] = useState<Tag[]>([])
    const [addVisible,setAddVisible] = useState(false)

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

      <AddTagModal visible={addVisible} onClose={() => {
        setAddVisible(false);
        getTags();
        }}/>

      <ScreenTitle title= "Tags" subtitle='Manage all your tags'/>

      <AddButton item='TAG' onPress={() => setAddVisible(true)}/>

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