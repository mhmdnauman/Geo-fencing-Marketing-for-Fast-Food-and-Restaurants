import React from "react";
import { useState, useContext, useEffect } from "react";

import {Text} from "../../../components/typography/text.component";
import {SafeArea} from "../../../components/utility/safe-area.component";
import {CheckoutContext} from "../../../services/checkout/checkout.context";
import axios from "axios";
import SERVERACCESS from "../../../../SERVERACCESS";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {FontAwesome} from "@expo/vector-icons"



export const CheckoutSuccessScreen = () => {
  
  const {Checkout, quantity} = useContext(CheckoutContext);
  const {onLogout, user} = useContext(AuthenticationContext);


  useEffect(() => {
  

    const placedOrder = async () =>{
      for(let i=0; i<Checkout.length; i++){
  
  
        const {data} = await axios.post(SERVERACCESS + "/order/placeOrders", {
          "user": user._id,
          "item":Checkout[i].name,
          "resname":Checkout[i].vicinity,
          "quantity":quantity,
          "price":Checkout[i].price,
          "payment": "Cash On Delivery",
          "address": user.address,
          "status": "Pending",
          "rating": "5",
          "contact": user.phoneNo,
          "lat": user.lat,
          "long": user.long
          }, {
            headers: {
              'Content-Type': 'application/json'
              }
        })
  
      }
  
    }
      placedOrder();
  },[]);


return(
  <SafeArea>
       
  <Text center>Your Order Has been Placed!</Text>
      </SafeArea>
);
}
