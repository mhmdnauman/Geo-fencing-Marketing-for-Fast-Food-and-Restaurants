import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,
  RefreshControl,
  ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SERVERACCESS from '../../../../SERVERACCESS';
import axios from 'axios';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';


async function getData(){
const getData = await fetch(SERVERACCESS + "/order/fetchAllOrders",{

    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      
    )
  
  });
  return getData;
}

const ordersData = [
  {
    id: '1',
    customerName: 'John Doe',
    itemName: 'Pizza',
    restaurantName: 'Pizza Palace',
    quantity: 2,
    price: 24.99,
    paymentMethod: 'Credit Card',
    address: '123 Main St, City, State',
    contactNumber: '555-1234',
    lat:"6584",
    long:"74586"
  },
  // Add more orders as needed
];



export const OrdersScreen = () => {

    const [refreshing, setRefreshing] = useState(false);  
    const {user} = useContext(AuthenticationContext);
    const [orders, setOrders] = useState(ordersData);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(1);
    
    
    useEffect(() => {

        const fetchOrdersData = async () => {
            try {
              const response = await axios.post(SERVERACCESS + "/order/fetchAllPendingOrders"); // Replace '/api/orders' with your MongoDB API endpoint
      
              // Update the ordersData state with the fetched data
              setOrders(response.data);
              
            } catch (error) {
              console.error('Error fetching data from MongoDB:', error);
            }
          };
      
          
          fetchOrdersData();
          
    setLoading(false);

    }, [orders]);


    const fetchNewOrdersData = async () => {
            
      try {
        const response = await axios.post(SERVERACCESS + "/order/fetchAllPendingOrders"); // Replace '/api/orders' with your MongoDB API endpoint

        // Update the ordersData state with the fetched data
        setRefreshing(false);
        var newdata = response.data;
        setOrders(newdata);
        
        

      } 
      
       catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    

        
    };


  const handleAcceptOrder = async (orderId) => {

        const acceptorder = async () => {
            try {
           
              const json = JSON.stringify({ 
                dpuserid: user._id,
                orderId: orderId
             });
           
           const response = await axios.post(SERVERACCESS + "/order/AcceptOrder", json, {
                 headers: {
               // Overwrite Axios's automatically set Content-Type
               'Content-Type': 'application/json'
             }});
           
           const refresh = await axios.post(SERVERACCESS + "/order/fetchAllPendingOrders"); // Replace '/api/orders' with your MongoDB API endpoint
           setOrders(refresh.data);

          } catch (error) {
              console.error('Error fetching data from MongoDB:', error);
            }
          };
      
    
          acceptorder();


    
    console.log('Accepted order:', orderId);
        

    
  };


  
  const renderItem = ({ item }) =>  (
    
    <View style={styles.orderContainer}>
      <Text style={styles.textContainer}>Customer Name: {item.userName}</Text>
      <Text style={styles.textContainer}>Item: {item.item}</Text>
      <Text style={styles.textContainer}>Restaurant: {item.resname}</Text>
      <Text style={styles.textContainer}>Quantity: {item.quantity}</Text>
      <Text style={styles.textContainer}>Price: Rs.{item.price}</Text>
      <Text style={styles.textContainer}>Payment Method: {item.payment}</Text>
      <Text style={styles.textContainer}>Delivery Address: {item.address}</Text>
      <Text style={styles.textContainer}>Contact Number: {item.contact}</Text>
      {loading && <Text>Loading..</Text>}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: item.lat,
          longitude: item.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{latitude:item.lat ,longitude: item.long}} />
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptOrder(item._id)}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  
  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      {loading && <Text>Loading..</Text>}
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchNewOrdersData} />
        }
      />
    </View>
  );

};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    orderContainer: {
      marginBottom: 16,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20
    },
    textContainer: {
        fontFamily: "Arial",
        fontSize: 20
    },
    foodItemText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    map: {
      height: 200,
      marginBottom: 8,
    },
    buttonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    acceptButton: {
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    rejectButton: {
      backgroundColor: 'red',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });