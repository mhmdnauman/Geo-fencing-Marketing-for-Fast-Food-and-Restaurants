import React from "react";

import {Text} from "../../../components/typography/text.component";
import {SafeArea} from "../../../components/utility/safe-area.component";
import {colors} from "../../../infrastructure/theme/colors";

export const CheckoutErrorScreen = ({route}) => {
  const {error = ""} = route.params;
  return (
    <SafeArea>
      <Text variant="label">{error}</Text>
    </SafeArea>
  );
};
