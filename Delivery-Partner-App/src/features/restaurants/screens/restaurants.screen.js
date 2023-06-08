import React, {useContext, useState} from "react";
import {TouchableOpacity, FlatList} from "react-native";
import styled from "styled-components/native";
import {ActivityIndicator} from "react-native-paper";

import {SafeArea} from "../../../components/utility/safe-area.component";
import {Spacer} from "../../../components/spacer/spacer.component";

import {RestaurantsContext} from "../../../services/restaurants/restaurants.context";
import {FadeInView} from "../../../components/animations/fade.animation";
import {Search} from "../components/search.component";
import {RestaurantInfoCard} from "../components/restaurant-info-card.component";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({navigation}) => {
  const {isLoading, restaurants} = useContext(RestaurantsContext);
  
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {/* {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )} */}
      <RestaurantList
        data={restaurants}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
