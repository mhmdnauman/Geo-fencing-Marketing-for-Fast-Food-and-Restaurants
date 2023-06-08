import React, { useState, useContext } from "react";
import { Card, Text, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { DatePicker } from "../components/datepicker";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { CheckoutContext } from "../../../services/checkout/checkout.context";


export const CreditScreen = ({ navigation }) => {

  const {Checkout} = useContext(CheckoutContext);

    const simpleAlertHandler = () => {
   
        alert('Your order has been placed');
      };

      const twoOptionAlertHandler = () => {
        //function to make two option alert
        Alert.alert(
         
          'Click Confirm to Place Your Order',
     
          `Order Summary: 
          Item Name: ${Checkout[0].name}
          Restaurant Name: KFC
          Address: user.address
          `,
          [
            { text: 'Confirm', onPress: () => navigation.navigate('confirmCC')
             },
            
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      };

  return (
    <>
      <>
        <Button
          title="Credit"
          icon="arrow-left"
          textColor="purple"
          onPress={() => navigation.navigate("pay")}
        >
          Credit/Debit
        </Button>
      </>
      <ScrollView>
        <Card style={Styles.container}>
          <Text style={{ fontWeight: "bold", fontSize: 20, margin: 20 }}>
            {" "}
            Invoice
          </Text>
          <Text>
            <Card.Cover
              source={{
                uri: "https://freepngimg.com/thumb/credit_card/26016-3-major-credit-card-logo-clipart.png",
              }}
              resizeMode="contain"
              style={{
                width: 326,
                height: 100,
              }}
            />
          </Text>

          <Card.Content style={{ margin: 20 }}>
            <Text style={{ fontWeight: "bold" }}> Card Number</Text>

            <TextInput
              placeholder="1234 5678 9012 3456"
              style={Styles.inputContainer}
            ></TextInput>

            <Text style={{ fontWeight: "bold" }}> Number on Card</Text>

            <TextInput
              placeholder="Ex.John website"
              style={Styles.inputContainer}
            ></TextInput>
            <Text style={{ fontWeight: "bold" }}>Expiry date</Text>

            <DatePicker />

            <Text style={{ fontWeight: "bold" }}> Security Code</Text>

            <TextInput
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              style={Styles.inputContainer}
            ></TextInput>
          </Card.Content>
          <Button buttonColor="#5D3FD3" textColor="white" mode="contained"
          
          onPress={twoOptionAlertHandler}>
            save
          </Button>
        </Card>
      </ScrollView>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 15,
    backgroundColor: "white",
  },

  inputContainer: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "grey",
    width: 250,
    borderWidth: 2,
    textColor: "grey",
    alignContent: "flex-start",
  },
});
