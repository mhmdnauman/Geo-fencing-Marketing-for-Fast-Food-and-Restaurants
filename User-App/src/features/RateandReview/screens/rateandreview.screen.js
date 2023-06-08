
import {Button} from "react-native-paper";
import { TextInput } from "react-native-paper";

import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  ErrorContainer,
  Title,
} from "../../../../src/features/account/components/account.styles";
import {
  AnimationWrapper,
} from "../../../../src/features/account/components/account.styles";
import LottieView from "lottie-react-native";



import { AuthInput } from "../../account/components/account.styles";

import axios from "axios";

import SERVERACCESS from "../../../../SERVERACCESS";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";


export const RateScreen = ({navigation}) => {
  
  const {user} = useContext(AuthenticationContext);
    
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [name, setName] = useState("");
  const [itemname, setItemName] = useState();
  const [itemID, setItemID] = useState();
  const [userID, setUserID] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
      
    const getdata = async () =>{

        const jsona = JSON.stringify({ 
          user: user._id
       });
  

      setUserID(user._id);
    const responsing = await axios.post(SERVERACCESS + "/order/fetchOrdersforRating", jsona, {
          headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }});
     
      setItemName(responsing.data.title);
      setItemID(responsing.data._id);
      setRefreshing(false);
      if(responsing.status==500){
        setMessage("No Recent Orders");
      }

    } 

    getdata();
    
  },[itemname]);
  
  
  
  const processReview = async () => {
    

    try {

      const jsona = JSON.stringify({ 
        user: user._id
     });

  
  const res = await axios.post(SERVERACCESS + "/order/fetchOrdersforRating", jsona, {
        headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }});
   
    console.log(res);


      const json = JSON.stringify({ 
        comment: name,
        ItemId: res.data
     });
   
   const response = await axios.post(SERVERACCESS + "/commentanalyze/analyze-comment", json, {
         headers: {
       // Overwrite Axios's automatically set Content-Type
       'Content-Type': 'application/json'
     }});
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
    }
  
    console.log(name);
  }



  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    <Button
      title="Go Back"
      icon="arrow-left"
      textColor="black"
      onPress={() => navigation.goBack()}>
      Go Back
    </Button>

    const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  
if(refreshing==true && !itemname){
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
  <Title>{message}</Title>
  </AccountContainer>
</AccountBackground>
);
}else if(refreshing==false && itemname){
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
        Rate and Review
        </Text>
        <Text style={styles.textStyle}>
          How was your experience with us
          </Text>
        <Text style={styles.textStyleSmall}>
        Please Rate Your Last Order for the item {itemname}
        
        </Text>
        {/* View to hold our Stars */}
        
        <TextInput
        style={styles.comment}
        placeholder="Comment Here"
        onChangeText={(value) => setName(value)}
        textContentType="text"
        keyboardType="text"
        autoCapitalize="none"
        />
        
        <Button onPress={() => {
          processReview();
          alert("Thank you for your Review")}
        }>Submit</Button>
        </View>
        
        
        </SafeAreaView>
        );
 
      }
      
      };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    // marginTop: 10,
    padding: 5   
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },

  comment:{
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    padding: 15,
   
  }
});