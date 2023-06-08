import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import SERVERACCESS from "../../../../SERVERACCESS";
import axios from "axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ordersData = [
  {
    id: "1",
    customerName: "John Doe",
    itemName: "Pizza",
    restaurantName: "Pizza Palace",
    quantity: 2,
    price: 24.99,
    paymentMethod: "Credit Card",
    address: "123 Main St, City, State",
    contactNumber: "555-1234",
    lat: "6584",
    long: "74586",
  },
  // Add more orders as needed
];

const fetchOrdersData = async () => {};

export const MapScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const [orders, setOrders] = useState(ordersData);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const json = JSON.stringify({
          userid: user._id,
        });

        const response = await axios.post(
          SERVERACCESS + "/order/TrackOrders",
          json,
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
      }
    };

    fetchOrdersData();
  }, [orders]);

  const fetchNewOrdersData = async () => {
    try {
      const json = JSON.stringify({
        userid: user._id,
      });

      const response = await axios.post(
        SERVERACCESS + "/order/TrackOrders",
        json,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );
      setRefreshing(false);
      var newdata = response.data;
      setOrders(newdata);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching data from MongoDB:", error);
    }
  };

  const handleAcceptOrder = (orderId) => {
    const acceptorder = async () => {
      try {
        const json = JSON.stringify({
          orderId: orderId,
        });

        const response = await axios.post(
          SERVERACCESS + "/order/CompleteOrder",
          json,
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );
        const jsona = JSON.stringify({
          userid: user._id,
        });
        const refresh = await axios.post(
          SERVERACCESS + "/order/TrackOrders",
          jsona,
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        ); // Replace '/api/orders' with your MongoDB API endpoint
        setOrders(refresh.data);
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
      }
    };

    acceptorder();

    // Handle logic for accepting the order
    console.log("Accepted order:", orderId);
  };

  const handleRejectOrder = (orderId) => {
    const acceptorder = async () => {
      try {
        const json = JSON.stringify({
          orderId: orderId,
        });

        const response = await axios.post(
          SERVERACCESS + "/order/RejectOrder",
          json,
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        );
        const jsone = JSON.stringify({
          userid: user._id,
        });
        const refresh = await axios.post(SERVERACCESS + "/order/TrackOrders", jsone, {
          headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }}); // Replace '/api/orders' with your MongoDB API endpoint
        setOrders(refresh.data);
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
      }
    };

    acceptorder();

    // Handle logic for rejecting the order
    console.log("Rejected order:", orderId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.textContainer}>Customer Name: {item.userName}</Text>
      <Text style={styles.textContainer}>Item: {item.item}</Text>
      <Text style={styles.textContainer}>Restaurant: {item.resname}</Text>
      <Text style={styles.textContainer}>Quantity: {item.quantity}</Text>
      <Text style={styles.textContainer}>Price: Rs.{item.price}</Text>
      <Text style={styles.textContainer}>Payment Method: {item.payment}</Text>
      <Text style={styles.textContainer}>Delivery Address: {item.address}</Text>
      <Text style={styles.textContainer}>Contact Number: {item.contact}</Text>
      <Text style={styles.textContainer}>Status: {item.status}</Text>
      <MapView
        style={styles.map}
        provider={"google"}
        initialRegion={{
          latitude: item.lat,
          longitude: item.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: item.lat, longitude: item.long }} />
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleRejectOrder(item._id)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!orders) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchNewOrdersData}
            />
          }
        />
      </View>
    );
  }
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
    padding: 20,
  },
  textContainer: {
    fontFamily: "Arial",
    fontSize: 20,
  },
  foodItemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  map: {
    height: 200,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
