import React, {useState, useContext} from "react";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import {Text} from "../../../components/typography/text.component";
import {Spacer} from "../../../components/spacer/spacer.component";
import {AuthenticationContext} from "../../../services/authentication/authentication.context";
import {ActivityIndicator, Colors} from "react-native-paper";

export const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {onRegister, isLoading, error} = useContext(AuthenticationContext);
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
              onPress={() => onRegister(name, username, email, password, repeatedPassword, phoneNumber)}>
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
};
