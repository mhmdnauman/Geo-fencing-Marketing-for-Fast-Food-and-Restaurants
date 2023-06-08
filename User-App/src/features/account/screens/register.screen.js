import React, {useState, useContext, useEffect} from "react";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import {
  AnimationWrapper,
} from "../components/account.styles";
import {Text} from "../../../components/typography/text.component";
import {Spacer} from "../../../components/spacer/spacer.component";
import {AuthenticationContext} from "../../../services/authentication/authentication.context";
import {ActivityIndicator, Colors} from "react-native-paper";
import * as Location from 'expo-location';
import LottieView from "lottie-react-native";

export const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const {onRegister, isLoading, error} = useContext(AuthenticationContext);

  useEffect(() => {
    const setLoc = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLat((await Location.getCurrentPositionAsync({})).coords.latitude);
      setLong((await Location.getCurrentPositionAsync({})).coords.longitude);
      
    }
    setLoc();

  }, []);




if(!long){
  return(

    <AccountBackground>
    <AccountCover />
    <AnimationWrapper>
      <LottieView
        key="animation"
        autoPlay
        loop
        resizeMode="cover"
        source={require("../../../../assets/watermelon.json")}
      />
    </AnimationWrapper>
    <Title>Couch Potato</Title>
    <AccountContainer>
    <Title>Loading...</Title>
    </AccountContainer>
  </AccountBackground>



  );
} 
else{

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Couch Potato</Title>
      <AccountContainer>
        
        <AuthInput
          label="Name"
          value={name}
          textContentType="Name"
          keyboardType="text"
          autoCapitalize="none"
          onChangeText={(u) => setName(u)}
        />

      <Spacer size="large">
          <AuthInput
            label="Username"
            value={username}
            textContentType="username"
            keyboardType="text"
            autoCapitalize="none"
            onChangeText={(u) => setUsername(u)}
          />
        </Spacer>
        
        <Spacer size="large">
          <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Phone Number"
            value={phoneNumber}
            textContentType="numeric"
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(p) => setPhoneNumber(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Address"
            value={address}
            textContentType="text"
            keyboardType="text"
            autoCapitalize="none"
            onChangeText={(u) => setAddress(u)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={async () => {    
                onRegister(name, username, email, password, repeatedPassword, phoneNumber,lat,long,address)}}>
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
    
} 
};
