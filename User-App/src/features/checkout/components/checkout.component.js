import React, {useContext} from "react";
import styled from "styled-components/native";
import {TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Text} from "../../../components/typography/text.component";
import { Button } from "react-native-paper";

import {CheckoutContext} from "../../../services/checkout/checkout.context";
import {useNavigation} from "@react-navigation/native";

const CheckoutButton = styled(TouchableOpacity)`
  position: absolute;
  top: 190px;
  right: 15px;
  z-index: 9;
`;

export const Checkout = ({restaurant}) => {
  const navigation = useNavigation();
  const {Checkout, addToCheckout, removeFromCheckout} =
    useContext(CheckoutContext);

  const isCheckout = Checkout.find((r) => r.placeId === restaurant.placeId);

  return (
    <>
      <CheckoutButton
        color="blue"
        icon="cart"
        onPress={() =>{  !isCheckout
            ? addToCheckout(restaurant)
            : removeFromCheckout(restaurant) ;
            navigation.navigate("Checkout")
            }
        

        }> 
        {/* <AntDesign
          name={isCheckout ? "shoppingcart" : "shoppingcart"}
          size={40}
          // color={isCheckout ? "red" : "lightblue"}
        /> */}
        <Button  
          buttonColor="#5D3FD3"

          mode="contained"

      >Add to Cart</Button>
      </CheckoutButton>
    </>
  );
};
