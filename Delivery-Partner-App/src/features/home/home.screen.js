import {useState} from "react";
import { Text } from "react-native-paper";
import axios from 'axios';
import SERVERACCESS from '../../../SERVERACCESS.js'

export const HomeScreen = async ({navigation}) => {

const [res, setRes] = useState();

    
// const getOrders = await fetch(SERVERACCESS+"/items/fetchOrders",{

//     method: 'GET',
//     headers:{
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(
//     )
  
//   });
  
//   setRes(await getOrders.json());


await axios.get(SERVERACCESS+"/items/fetchOrders")
  .then(function (response) {
    // handle success
    setRes(response.json);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

    return(

        <><Text>
           {res}
            </Text>
                
                </>
      
     )

    }
    
    
     




   