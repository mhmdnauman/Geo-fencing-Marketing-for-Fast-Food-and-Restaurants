import React from "react";
import LottieView from "lottie-react-native";

import {Spacer} from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";

export const AccountScreen = ({navigation}) => {
  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/DeliveryPartner.json")}
        />
      </AnimationWrapper>
      <Title>Couch Potato</Title>
      <AccountContainer>
        <AuthButton
          icon="email"
          mode="contained"
          onPress={() => navigation.navigate("Login")}>
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => navigation.navigate("Register")}>
            Register
          </AuthButton>
        </Spacer>
       
      </AccountContainer>
    </AccountBackground>
  );
};
