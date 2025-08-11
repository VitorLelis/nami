import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';

type Props = {
  children: ReactNode;
};

export default function ScreenContainer({ children }: Props) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 28,
    padding: 24,
  },
});
