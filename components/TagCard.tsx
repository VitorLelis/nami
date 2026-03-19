import React from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import { Tag } from "@/db/useDatabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";

type Props = {
  tag: Tag;
};

export default function TagCard({ tag }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
          <FontAwesome6 name={tag.icon} size={18} color={Colors.text} />
          <Text style={styles.textContainer}>{tag.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: Colors.defaultGray,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    fontWeight: "600",
    fontSize: 18,
  },
});
