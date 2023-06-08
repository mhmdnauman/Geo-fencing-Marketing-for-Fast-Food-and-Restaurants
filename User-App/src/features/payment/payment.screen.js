import { Button } from "react-native-paper";
import { Card } from "react-native-paper";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import {CheckoutContext} from "../../services/checkout/checkout.context";


// const paymentmethod = [
  //   {
    //     image:
    //       "https://seeklogo.com/images/E/easypaisa-logo-477156A1F0-seeklogo.com.png",
    //     alt: "easypaisa",
    //     Card: "Card",
    //   },
    
    //   {
//     image:
//       "https://www.shutterstock.com/image-vector/credit-card-icon-600w-381278500.jpg",
//     alt: "Credit",
//     Card: "Card",
//   },
//   {
//     image:
//       "https://png.pngtree.com/png-clipart/20210530/original/pngtree-cash-on-delivery-bagde-olshop-png-image_6359688.jpg",
//     alt: "cashondelivery",
//     Card: "Card",
//   },
// ];

export const PaymentScreen = ({ navigation }) => {
  const {Checkout} = useContext(CheckoutContext);


  const twoOptionAlertHandler = async () => {
    //function to make two option alert

    Alert.alert(
     
      'Click Confirm to Place Your Order',
     
      `Order Summary: 
      Item Name: ${Checkout[0].name}
      Restaurant Name: KFC
      Address: user.address
      `,
      [
        { text: 'Confirm', onPress:() => {
          navigation.navigate('confirm')
        }
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
          title="Payment"
          icon="arrow-left"
          textColor="purple"
          onPress={() => navigation.navigate("Checkout")}
        >
          Payment
        </Button>
        <ScrollView>

        <Card style={{flex:1 , backgroundColor:"white" ,borderColor:"black" , borderWidth:2, borderRadius:10, margin:5}}>
         
<View style={{ margin:40, justifyContent:'center' }}>
          <View style={{ padding: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate("credit")}>
              <Card
                style={{
                 
                  backgroundColor: "white",
                 
                  height:150,
                 
                  padding: 10,
                }}
              >
                <Text style={styles.paragraph}>
                  <Card.Cover
                    source={{
                      uri:  "https://www.shutterstock.com/image-vector/credit-card-icon-600w-381278500.jpg",
                    }}
                    resizeMode="contain"
                    style={{
                      borderRadius: 70,
                      height: 110,
                      width: 110,
                    }}
                  />   
                </Text>
              </Card>
            </TouchableOpacity>
            
          </View>


          <View style={{ padding: 5 }}>
            <TouchableOpacity 
           
            onPress={twoOptionAlertHandler}>
              <Card
                style={{
                
                
                  backgroundColor: "white",
                
                  height:150,
                  padding: 10,
                }}
              >
                <Text style={styles.paragraph}>
                  <Card.Cover
                    source={{
                      uri:"https://png.pngtree.com/png-clipart/20210530/original/pngtree-cash-on-delivery-bagde-olshop-png-image_6359688.jpg",
                    }}
                    resizeMode="contain"
                    style={{
                      borderRadius: 70,
                      height: 110,
                      width: 110,
                    }}
                  />   
                </Text>
              </Card>
            </TouchableOpacity>
            
          </View>
          </View>
          </Card>
        </ScrollView>
      </>
     
    </>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    textAlign: "center",
    padding: 10,
  },

  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 0,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },

  checkboxContainer: {
    flexDirection: "column-reverse",
    marginLeft: 180,
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
  },

  button: {},
});
