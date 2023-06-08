import React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import { CreditScreen } from "../../features/Order/screens/Orderalert.screen";

import {CheckoutScreen} from "../../features/checkout/screens/checkout.screen";
import {CheckoutErrorScreen} from "../../features/checkout/screens/checkout-error.screen";
import {CheckoutSuccessScreen} from "../../features/checkout/screens/checkout-success.screen";
import {CheckoutSuccessScreenCC} from "../../features/checkout/screens/checkout-success.screen.CreditCard";
import { PaymentScreen } from "../../features/payment/payment.screen";

const CheckoutStack = createStackNavigator();
export const CheckoutNavigator = () => (
  <CheckoutStack.Navigator headerMode="none">
    <CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
    <CheckoutStack.Screen
      name="CheckoutSuccess"
      component={CheckoutSuccessScreen}
    />
    <CheckoutStack.Screen
      name="CheckoutError"
      component={CheckoutErrorScreen}
    />
    <CheckoutStack.Screen name="pay" component={PaymentScreen} />
    <CheckoutStack.Screen name="credit" component={CreditScreen} />
    <CheckoutStack.Screen name="confirm" component={CheckoutSuccessScreen} />
    <CheckoutStack.Screen name="confirmCC" component={CheckoutSuccessScreenCC} />
  </CheckoutStack.Navigator>
);
