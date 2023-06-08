import React, {useContext, useEffect, useState} from "react";
import {TouchableOpacity, FlatList, View} from "react-native";
import styled from "styled-components/native";
import {ActivityIndicator, Button, Colors} from "react-native-paper";

import {SafeArea} from "../../../components/utility/safe-area.component";
import {Spacer} from "../../../components/spacer/spacer.component";
import {FavouritesBar} from "../../../components/favourites/favourites-bar.component";

import {FoodDealContext} from "../../../services/foodDeal/foodDeal.context";
import {McDealContext} from "../../../services/foodDeal/foodDeal.context-McDonalds";
import {LayersDealContext} from "../../../services/foodDeal/foodDeal.context-Layers";
import {FavouritesContext} from "../../../services/favourites/favourites.context";
import {FadeInView} from "../../../components/animations/fade.animation";
import {Search} from "../components/search.component";
import {FoodDealInfoCard} from "../components/foodDeal-info-card.component";
import {Text} from "../../../components/typography/text.component";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
    // width: 200,
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

export const FoodDealScreen = ({navigation}) => {
  const {isLoading, restaurants, setRestaurants} = useContext(FoodDealContext);
  const {isMcLoading ,Mcrestaurants} = useContext(McDealContext);
  const {isLayersLoading ,Layersrestaurants} = useContext(LayersDealContext);
  const {favourites} = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const [foodDeals, setFoodDeals] = useState();
  const [KFCdealToggle, setKFCDealToggle] = useState(true);
  const [McDonaldsdealToggle, setMcDonaldsDealToggle] = useState(false);
  const [LayersdealToggle, setLayersDealToggle] = useState(false);

  //   const setDeals = () =>{
  //     if(dealToggle=="KFC"){
  //       setFoodDeals(restaurants);
  //     }
  //     else if(dealToggle=="McDonalds"){
  //       setFoodDeals(Mcrestaurants);
  //     }
  //     else if(dealToggle=="Layers"){
  //       setFoodDeals(Layersrestaurants);
  //     }
  // }

  useEffect(()=>{
    console.log("I changed");
  },[KFCdealToggle]);

  
  return (
    <SafeArea>
      {isMcLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}
      {isLayersLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} />
        </LoadingContainer>
      )}

      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <View style={{display: "flex", flexDirection: "row", alignSelf: "center"}}>
      <Button onPress={() => {
        setKFCDealToggle(true);
        setMcDonaldsDealToggle(false);
        setLayersDealToggle(false);
      }
        }>KFC</Button>
        <Button onPress={() => {
        setKFCDealToggle(false);
        setMcDonaldsDealToggle(true);
        setLayersDealToggle(false);
      }
        }>McDonalds</Button>
        <Button onPress={() => {
        setKFCDealToggle(false);
        setMcDonaldsDealToggle(false);
        setLayersDealToggle(true);
        }
        }>Layers</Button>
      </View>
      {KFCdealToggle? (<RestaurantList
        data={restaurants}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FoodDealDetail", {
                  restaurant: item,
                })
              }>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <FoodDealInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      /> ) : McDonaldsdealToggle ? (<RestaurantList
        data={Mcrestaurants}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FoodDealDetail", {
                  restaurant: item,
                })
              }>
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <FoodDealInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />) : LayersdealToggle? (<RestaurantList
      data={Layersrestaurants}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FoodDealDetail", {
                restaurant: item,
              })
            }>
            <Spacer position="bottom" size="large">
              <FadeInView>
                <FoodDealInfoCard restaurant={item} />
              </FadeInView>
            </Spacer>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.name}
    />): (<RestaurantList
      data={restaurants}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FoodDealDetail", {
                restaurant: item,
              })
            }>
            <Spacer position="bottom" size="large">
              <FadeInView>
                <FoodDealInfoCard restaurant={item} />
              </FadeInView>
            </Spacer>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.name}
    /> )}
      
    </SafeArea>
  );
    

};
