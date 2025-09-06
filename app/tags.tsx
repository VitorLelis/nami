import ScreenTitle from '@/components/ScreenTitle';
import ScreenContainer from '@/components/ScreenContainer';
import { useEffect, useState } from 'react';
import { Tag, useDatabase } from '@/db/useDatabase';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { Alert, FlatList } from 'react-native';
import TagCard from '@/components/TagCard';
import AddButton from '@/components/AddButton';
import AddTagModal from '@/components/AddTagModal';
import MessageModal from '@/components/MessageModal';

export default function TagScreen() {
  const [tagList,setTagList] = useState<Tag[]>([])
  const [addVisible,setAddVisible] = useState(false)
  const [deleteVisible,setDeleteVisible] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  const db = useDatabase();

  async function getTags() {
    const tags = await db.getTagList()
    setTagList(tags)
  }

  async function handleDelete() {
    try {
      await db.deleteTag(Number(selectedId));
    } catch (error) {
      Alert.alert('Error', String(error));
    }
    setDeleteVisible(false)
    getTags();
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
        }}
      />

      <MessageModal 
        visible={deleteVisible}
        message='DELETE THE TAG?'
        buttonText='DELETE'
        onPress={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <ScreenTitle title= "Tags" subtitle='Manage all your tags'/>

      <AddButton item='TAG' onPress={() => setAddVisible(true)}/>

      <FlatList
            data={tagList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TagCard tag={item} 
                onEdit={() => console.log("edit tag")} 
                onDelete={() => {
                  setSelectedId(item.id);
                  setDeleteVisible(true)
                }} 
              />
              
            )}
            contentContainerStyle={{gap: 12,paddingBottom: 24,}}
            showsVerticalScrollIndicator={false}
          />
    </ScreenContainer>
  );
}