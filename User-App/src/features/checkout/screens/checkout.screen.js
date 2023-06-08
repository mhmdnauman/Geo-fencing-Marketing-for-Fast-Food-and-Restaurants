// import React from "react";
// import {ScrollView} from "react-native";
// import {SafeArea} from "../../../components/utility/safe-area.component";
// import {Spacer} from "../../../components/spacer/spacer.component";
// import {
//   ButtonContainer,
//   ButtonCover,
//   ProceedButton,
// } from "../components/checkout.styles";

// export const CheckoutScreen = ({navigation}) => {
//   return (
//     <SafeArea>
//       <ScrollView>
//         <ButtonCover />
//         <ButtonContainer>
//           <Spacer size="large">
//             <ProceedButton label="Pay" icon="cash" mode="contained">
//               Proceed to Pay
//             </ProceedButton>
//           </Spacer>
//         </ButtonContainer>
//       </ScrollView>
//     </SafeArea>
//   );
// };

import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/native";
import {List, Avatar} from "react-native-paper";

import {CheckoutContext} from "../../../services/checkout/checkout.context";
import {FontAwesome} from "@expo/vector-icons"

import {SafeArea} from "../../../components/utility/safe-area.component";
import {Text} from "../../../components/typography/text.component";
import {Spacer} from "../../../components/spacer/spacer.component";

import {RestaurantList} from "../../../features/FoodDeal/components/foodDeal-list.styles";
import {FoodDealInfoCard} from "../../FoodDeal/components/foodDeal-info-card.component";
import {FoodDealCheckoutInfoCard} from "../../FoodDeal/components/foodDeal-info-checkout-card.component";
import {Button} from "react-native-paper";
import SERVERACCESS from "../../../../SERVERACCESS";
import axios from "axios";

import {AuthenticationContext} from "../../../services/authentication/authentication.context";


const NoCheckoutArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;
export const CheckoutScreen = ({navigation}) => {
  const {Checkout, quantity, updateQuantity} = useContext(CheckoutContext);
  const {onLogout, user} = useContext(AuthenticationContext);
// const userid = "6473288f5933c70c64809e99";

useEffect(()=>{

  updateQuantity(1);


},[]);

const incrementQuantity = () => {
  updateQuantity(quantity + 1);
};

const decrementQuantity = () => {
  if(quantity>=2){
  updateQuantity(quantity - 1);
}
};



  return Checkout.length ? (
    <SafeArea>
      <Button
        title="Go Back"
        icon="arrow-left"
        textColor="black"
        onPress={() => navigation.goBack()}></Button>

      <RestaurantList
        data={Checkout}
        renderItem={({item}) => {
          return (
            // <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate("RestaurantDetail", {
            //       restaurant: item,
            //     })
            //   }>
            <Spacer position="bottom" size="large">
              <FoodDealCheckoutInfoCard restaurant={item} />
            </Spacer>

            // </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />

      <Text style={{padding: 24, }}>Quantity: {quantity}</Text>
      <Button title="Increment" onPress={incrementQuantity}>Increase Quantity +</Button>
      <Button title="Decrement" onPress={decrementQuantity} >Decrease Quantity -</Button>

      <Spacer position="left" size="medium">
        <List.Section />
        <Button
          title="Proceed to Checkout"
          buttonColor="#5D3FD3"
          icon="shopping"
          textColor="white"
          mode="contained"
           onPress={async () =>  navigation.navigate("pay")}
          //   console.log(Checkout);
            
          //  
            
          //   for(let i=0; i<Checkout.length; i++){


          //   const {data} = await axios.post(SERVERACCESS + "/order/placeOrders", {
          //     "user": user._id,
          //     "item":Checkout[i].name,
          //     "resname":"KFC",
          //     "quantity":1,
          //     "price":Checkout[i].price,
          //     "payment": "Credit Card",
          //     "address": "Rose Lane 5A, New Lalazar",
          //     "status": "Pending",
          //     "rating": "5",
          //     "contact": "+92 333 5378069",
          //     "lat": 33.561740,
          //     "long": 73.074193,
          //     }, {
          //       headers: {
          //         'Content-Type': 'application/json'
          //         }
          //   })

          // }
          //   console.log(data)


            
          //   }}
          >
          Place Order
        </Button>
      </Spacer>
    </SafeArea>
  ) : (
    <NoCheckoutArea>
    <FontAwesome name="shopping-basket" size={64}/>
      <Text center>No Checout yet</Text>
    </NoCheckoutArea>
  );
};
