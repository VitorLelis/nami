import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -5, marginTop: 5 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.defaultYellow,
        headerShown: useClientOnlyValue(false, false),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="coins" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new-transaction"
        options={{
          title:'',
          tabBarIcon: ({ color }) => <TabBarIcon name="circle-plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title:'',
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title:'',
          tabBarIcon: ({ color }) => <TabBarIcon name="piggy-bank" color={color} />,
        }}
      />
    </Tabs>
  );
}
