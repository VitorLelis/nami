import Colors from "@/constants/Colors";
import React from "react";
import { Text, View } from '@/components/Themed';
import { StyleSheet } from "react-native";

interface ScreenTitleProps {
  title: string;
  subtitle: string;
}

export default function ScreenTitle({ title, subtitle }: ScreenTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingVertical: 24, 
  },
  innerContainer: {
    alignItems: "center", 
  },
  title: {
    fontSize: 24, 
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.subtitle,
    textAlign: "center",
  },
});

