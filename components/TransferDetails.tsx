import Colors from "@/constants/Colors";
import { Tag, useDatabase, Wallet } from "@/db/useDatabase";
import React, { useState } from "react";
import { TextInput, Pressable, StyleSheet, Platform, Alert, TouchableOpacity} from "react-native";
import { Text,View } from "./Themed";
import { FontAwesome6 } from "@expo/vector-icons";
import PickTagModal from "./PickTagModal";
import PickWalletModal from "./PickWalletModal";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import MessageModal from "./MessageModal";
import { router } from "expo-router";
import { parseNumber } from "@/utils/parseNumber";

export default function TransferDetails(){
  const [value,setValue] = useState('')
  const [desc,setDesc] = useState('')
  const [fromWallet, setFromWallet] = useState<Wallet>()
  const [toWallet, setToWallet] = useState<Wallet>()
  const [fromWalletPickVisible, setFromWalletPickVisible] = useState(false)
  const [toWalletPickVisible, setToWalletPickVisible] = useState(false)
  const [tag,setTag] = useState<Tag>()
  const [tagPickVisible, setTagPickVisible] = useState(false)
  const [date,setDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  const db = useDatabase();

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      const newFormatted = selectedDate.toISOString().split('T')[0];
      setFormattedDate(newFormatted);
    }
  };

  async function handlePress() {
    try {
      if (isNaN(parseNumber(value))){
        Alert.alert('Error', 'It must be a Number!');  
      }
      const nValue = parseNumber(value)
      db.addTransaction(-nValue,desc,formattedDate,tag!.id,fromWallet!.id)
      db.addTransaction(nValue,desc,formattedDate,tag!.id,toWallet!.id)

      setMessageVisible(true);
    } catch (error) {
      Alert.alert('Error', String(error));
    }
  }

  return (
    <View style={styles.container}>

      <PickWalletModal
        visible={fromWalletPickVisible}
        onClose={() => setFromWalletPickVisible(false)}
        onPick={setFromWallet}
      />

      <PickWalletModal
        visible={toWalletPickVisible}
        onClose={() => setToWalletPickVisible(false)}
        onPick={setToWallet}
      />

      <PickTagModal
        visible={tagPickVisible}
        onClose={() => setTagPickVisible(false)}
        onPick={setTag}
      />

      <MessageModal
        visible={messageVisible}
        message="TRANSFERENCE COMPLETE"
        buttonText="CLOSE"
        onPress={router.back}
        onClose={()=>setMessageVisible(false)}
      />

    <View style={styles.card}>

        <View style={styles.header}>
            <FontAwesome6 name="arrow-right-arrow-left" size={20} color={Colors.text} />
            <Text style={styles.title}>Transfer between Wallets</Text>
        </View>
        
        <View style={styles.field}>
          <Text style={styles.label}>From</Text>
          <Pressable style={styles.selectButton} onPress={() => setFromWalletPickVisible(true)}>
            <Text>{fromWallet?.name}</Text>
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>To</Text>
          <Pressable style={styles.selectButton} onPress={() => setToWalletPickVisible(true)}>
            <Text>{toWallet?.name}</Text>
          </Pressable>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Value</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={value}
            onChangeText={setValue}
            placeholder="0.00"
            placeholderTextColor={Colors.subtitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={desc}
            onChangeText={setDesc}
            placeholder="Enter transaction description"
            placeholderTextColor={Colors.subtitle}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <Pressable style={styles.selectButton} onPress={() => setShowDatePicker(true)}>
            <Text>{formattedDate}</Text>
          </Pressable>
        </View>

        {showDatePicker && (
          <RNDateTimePicker
            value={date}
            mode='date'
            display='default'
            onChange={onDateChange}
          />
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Tag</Text>
          <Pressable style={styles.selectButton} onPress={() => setTagPickVisible(true)}>
            <Text>{tag?.name}</Text>
          </Pressable>
        </View>

        {fromWallet && toWallet && (
            <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
              <Text style={styles.submitText}>TRANSFER</Text>
            </TouchableOpacity>
        )}

     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  field: {
    marginBottom: 4,
  },
  label: {
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
      width: '100%',
      borderRadius: 5,
      backgroundColor:Colors.progessBar,
      padding: 10,
      marginBottom: 10,
      color: Colors.lightGray
    },
  selectButton: {
    borderWidth: 1,
    borderColor: Colors.progessBar,
    borderRadius: 8,
    padding: 12,
    backgroundColor: Colors.progessBar,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: Colors.defaultYellow,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: Colors.background,
    fontWeight: "600",
    fontSize: 16
  },
  card: {
      backgroundColor: Colors.defaultGray,
      borderRadius: 10,
      padding: 18,
    },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});