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


export default function AddTransactionInfo()  {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");
  const [value,setValue] = useState('')
  const [desc,setDesc] = useState('')
  const [wallet, setWallet] = useState<Wallet>()
  const [walletPickVisible, setWalletPickVisible] = useState(false)
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
      if (isNaN(Number(value))){
        Alert.alert('Error', 'It must be a Number!');  
      }
      const newValue = transactionType ==='expense'? -Number(value): Number(value)

      await db.addTransaction(newValue,desc,formattedDate,tag!.id,wallet!.id)

      setMessageVisible(true);
    } catch (error) {
      Alert.alert('Error', String(error));
    }
  }

  const handleClose = () => {
    setValue('')
    setDesc('')
    setDate(new Date())
    setWallet(undefined)
    setTag(undefined)
    setMessageVisible(false)
  }

  return (
    <View style={styles.container}>
      {/*Modals*/}

      <PickWalletModal
        visible={walletPickVisible}
        onClose={() => setWalletPickVisible(false)}
        onPick={setWallet}
      />

      <PickTagModal
        visible={tagPickVisible}
        onClose={() => setTagPickVisible(false)}
        onPick={setTag}
      />

      <MessageModal
        visible={messageVisible}
        message="TRANSACTION ADDED"
        buttonText="CLOSE"
        onPress={handleClose}
        onClose={handleClose}
      />

      {/* Transaction Type Toggle */}
      <View style={styles.toggleRow}>
        <Pressable
          style={[styles.toggleButton, transactionType === "expense" && styles.activeExpenseButton]}
          onPress={() => setTransactionType("expense")}
        >
          <Text style={[styles.buttonExpenseText,transactionType === "expense" && styles.activeButtonText]}>
            EXPENSE
            </Text>
        </Pressable>

        <Pressable
          style={[styles.toggleButton, transactionType === "income" && styles.activeIncomeButton]}
          onPress={() => setTransactionType("income")}
        >
          <Text style={[styles.buttonIncomeText,transactionType === "income" && styles.activeButtonText]}>
            INCOME
            </Text>
        </Pressable>
      </View>

      {/* Transaction Form */}
    <View style={styles.card}>

        <View style={styles.header}>
        <FontAwesome6 name="plus" size={20} color={Colors.text} />
            <Text style={styles.title}>
            {transactionType === "income" ? "Add Income" : "Add Expense"}
            </Text>
        </View>
        

        <View style={styles.field}>
          <Text style={styles.label}>Value</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
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

        <View style={styles.field}>
          <Text style={styles.label}>Wallet</Text>
          <Pressable style={styles.selectButton} onPress={() => setWalletPickVisible(true)}>
            <Text>{wallet?.name}</Text>
          </Pressable>
        </View>


        <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
          <Text style={styles.submitText}>
            ADD {transactionType === "income" ? "INCOME" : "EXPENSE"}
          </Text>
        </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: Colors.defaultGray
  },
  buttonIncomeText: {
    color: Colors.income,
    fontWeight: "bold",
  },
  buttonExpenseText: {
    color: Colors.expense,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: Colors.background,
    fontWeight: "bold",
  },
  activeIncomeButton: {
    backgroundColor: Colors.income,
  },
  activeExpenseButton: {
    backgroundColor: Colors.expense,
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
