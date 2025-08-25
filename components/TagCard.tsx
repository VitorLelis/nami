import React from "react";
import { Text, View } from "./Themed";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Tag } from "@/db/useDatabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";
import toMoney from "@/utils/toMoney";
import { formatDate } from "@/utils/dateFormat";

type Props = {
  tag: Tag;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TagCard({ tag, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
          <Text style={styles.textContainer}>{tag.name}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(tag.id)} style={styles.actionBtn}>
            <FontAwesome6 name="edit" size={16} color={Colors.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(tag.id)} style={styles.actionBtn}>
            <FontAwesome6 name="trash-can" size={16} color={Colors.lightGray} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
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
    marginLeft: 8,
    flex: 1,
    fontWeight: "600",
    fontSize: 18,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  actions: {
    flexDirection: "row",
    marginTop: 4,
  },
  actionBtn: {
    marginLeft: 10,
    padding: 4,
  },
});
