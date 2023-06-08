import React, {useContext} from "react";
import {McDealContext} from "../../../services/foodDeal/foodDeal.context-McDonalds";
import {Spacer} from "../../../components/spacer/spacer.component";
import styled from "styled-components";
import {FoodDealInfoCard} from "../../FoodDeal/components/foodDeal-info-card.component";
import {FlatList} from "react-native";

import {SafeArea} from "../../../components/utility/safe-area.component";

import {RestaurantInfoCard} from "../components/restaurant-info-card.component";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
    width: 360,
    // height: 300,
  },
})``;
export const McRestaurantDetailScreen = ({navigation, route}) => {
  const {Mcrestaurants} = useContext(McDealContext);

  const {restaurant} = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />

      <RestaurantList
        data={Mcrestaurants}
        renderItem={({item}) => {
          return (
            <Spacer position="bottom" size="large">
              <FoodDealInfoCard restaurant={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
