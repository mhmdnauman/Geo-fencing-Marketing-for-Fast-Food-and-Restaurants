import styled from "styled-components/native";
import {Button} from "react-native-paper";
import {colors} from "../../../infrastructure/theme/colors";

// import {
//   Avatar,
//   TextInput,
//   ActivityIndicator,
//   Button,
//   Colors,
// } from "react-native-paper";
// import {colors} from "../../../infrastructure/theme/colors";

// export const CartIconContainer = styled.View`
//   align-items: center;
//   justify-content: center;
//   flex: 1;
// `;

// export const PaymentProcessing = styled(ActivityIndicator).attrs({
//   size: 128,
//   animating: true,
//   color: Colors,
// })`
//   position: absolute;
//   top: 50%;
//   left: 35%;
//   z-index: 999;
// `;

// export const CartIcon = styled(Avatar.Icon).attrs({
//   size: 128,
// })`
//   background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
// `;

// export const NameInput = styled(TextInput)`
//   margin: ${(props) => props.theme.space[3]};
// `;

// export const PayButton = styled(Button).attrs({
//   color: colors.brand.primary,
// })`
//   width: 80%;
//   align-self: center;
//   padding: ${(props) => props.theme.space[2]};
// `;
export const ButtonCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const ButtonContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[8]};
  left: 200px;
  width: 199px;
`;

export const ProceedButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;
