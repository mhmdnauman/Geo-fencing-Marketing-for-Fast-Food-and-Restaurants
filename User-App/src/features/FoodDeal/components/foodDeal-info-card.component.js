import React from "react";
import {SvgXml} from "react-native-svg";
import {Checkout} from "../../checkout/components/checkout.component";
import {Spacer} from "../../../components/spacer/spacer.component";
import {Text} from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import {View} from "react-native";
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Address,
} from "./foodDeal-info-card.styles";

export const FoodDealInfoCard = ({restaurant} = {}) => {
  const navigation = useNavigation();
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
    price = 0,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <View>
        <Checkout restaurant={restaurant} />
        <RestaurantCardCover key={name} source={{uri: photos[0]}} />
      </View>
      <Info>
        <Text variant="label">{name}</Text>
        <Text variant="label">Rs. {price}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}<Text>{rating}</Text>
          </Rating>
          <SectionEnd>
            {/* {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}

            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="medium">
              <Icon source={{uri: icon}} />
            </Spacer> */}

            {/* <Spacer position="left" size="medium">
              <Button
                title="Go to Checkout"
                buttonColor="#5D3FD3"
                icon="shopping"
                textColor="white"
                mode="contained"
                onPress={() => navigation.navigate("Checkout")}>
                Go To Cart
              </Button>
            </Spacer> */}
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
