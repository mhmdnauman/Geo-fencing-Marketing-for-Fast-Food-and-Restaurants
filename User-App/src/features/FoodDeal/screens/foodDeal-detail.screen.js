import React, {useContext} from "react";
import {FoodDealContext} from "../../../services/foodDeal/foodDeal.context";
import {FoodDealInfoCard} from "../components/foodDeal-info-card.component";
import {HeaderText} from "../components/foodDeal-info-card.styles";
import {Text} from "../../../components/typography/text.component";


import {SafeArea} from "../../../components/utility/safe-area.component";
import {TextInput} from "react-native-paper";
import styled from "styled-components";
import { FlatList,View } from "react-native";

export const FoodDealDetailScreen = ({route}) => {
  const {restaurants} = useContext(FoodDealContext);
  const {restaurant} = route.params;

  const renderComment = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <SafeArea>
      <FoodDealInfoCard restaurant={restaurant} />
      <Text></Text>
      <Text style={{padding: 14}} >Description: {restaurant.description}</Text>
      <Text></Text>
      <HeaderText style={{padding: 14}}>Reviews</HeaderText>
      <FlatList
        data={restaurant.reviews}
        renderItem={renderComment}
        style={{padding: 14}}
      />
    </SafeArea>
  );
};
