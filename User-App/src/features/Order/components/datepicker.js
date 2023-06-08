import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };

  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSave = () => {
    console.log('Selected Date:', selectedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={selectedDate.toDateString()}
        onFocus={handleOpenDatePicker}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {/* <Button title="Save" onPress={handleSave} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin:
    
     flex: 1,
 alignContent:'flex-start',
    margin: 30,
    backgroundColor: "white",
  },
  input: {
    margin: 10,
    width: 250,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 5,
    alignContent: "flex-start",

    
  },
});


