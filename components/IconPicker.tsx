import React from "react";
import { Text } from "./Themed";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Props {
  selectedIcon: string;
  onSelect: (iconName: string) => void;
}

const ICONS = [
  { name: "tag", label: "Tag" },
  { name: "money-bill", label: "Money" },
  { name: "house-chimney-window", label: "House" },
  { name: "car-side", label: "Transport" },
  { name: "utensils", label: "Food" },
  { name: "cart-shopping", label: "Groceries" },
  { name: "heart-pulse", label: "Health" },
  { name: "dumbbell", label: "Sports" },
  { name: "paw", label: "Pets" },
  { name: "people-roof", label: "Family" },
  { name: "gift", label: "Gift" },
  { name: "gamepad", label: "Fun" },
  { name: "book", label: "School" },
  { name: "plane-departure", label: "Travel" },
  { name: "computer", label: "Technology" },
  { name: "church", label: "Church" },
  { name: "building-columns", label: "Taxes" },
  { name: "spray-can-sparkles", label: "Beauty" },
  { name: "arrow-right-arrow-left", label: "Transfer"}
];

export default function IconPicker({ selectedIcon, onSelect }: Props) {
  return (
    <FlatList
                  data={ICONS}
                  keyExtractor={(item) => item.name}
                  style={styles.iconList}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const isSelected = item.name === selectedIcon;
                    return (
                      <TouchableOpacity
                        style={styles.iconRow}
                        onPress={() => {
                          onSelect(item.name);
                        }}
                      >
                        <FontAwesome6
                          name={item.name}
                          size={22}
                          color={isSelected ? Colors.defaultYellow : Colors.lightGray}
                        />
                        <Text
                          style={[
                            styles.iconText,
                            { color: isSelected ? Colors.defaultYellow : Colors.lightGray },
                          ]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
  );
}

const styles = StyleSheet.create({
    iconList:{
    width: '100%', 
    marginBottom: 15, 
    borderRadius: 6,
    backgroundColor:Colors.progessBar,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin:4
  },
  iconText: {
    marginLeft: 10,
    fontSize: 14,
  },
});
