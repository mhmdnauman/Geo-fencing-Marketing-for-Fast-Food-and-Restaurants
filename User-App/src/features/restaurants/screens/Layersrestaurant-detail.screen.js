import React, {useContext} from "react";
import {LayersDealContext} from "../../../services/foodDeal/foodDeal.context-Layers";
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
export const LayersRestaurantDetailScreen = ({navigation, route}) => {
  const {Layersrestaurants} = useContext(LayersDealContext);

  const {restaurant} = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />

      <RestaurantList
        data={Layersrestaurants}
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
