import {mocks, mockImages} from "./mock";
import camelize from "camelize";
import antwerp from "./mock/antwerp.json";
import chicago from "./mock/chicago.json";
import toronto from "./mock/toronto.json";
import axios from 'axios';
import SERVERACCESS from '../../../SERVERACCESS.js'


export const restaurantsRequest = async (loc) => {
  return new Promise(async (resolve, reject) => {


    const restdata = [];

    axios
  .get(SERVERACCESS + "/items/fetchitems", {
    responseType: "json",})
  .then(function (response) {
    //console.log(response.data[0].Name);
  
    let san_francisco ={html_attributions: [],
      next_page_token: "some token",
      results: [],
    status: "OK",}
//0-10
for(let i=201; i<213; i++){
    let fetchedRest = {
          business_status: "OPERATIONAL",
          geometry: {
            location: {
              lat: 37.77653919999999,
              lng: -122.4249244,
            },
            viewport: {
              northeast: {
                lat: 37.77793988029149,
                lng: -122.4235858197085,
              },
              southwest: {
                lat: 37.77524191970849,
                lng: -122.4262837802915,
              },
            },
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          name: response.data[i].title,
          opening_hours: {
            open_now: true,
          },
          photos: [
            response.data[i].image
        ]
          ,
          place_id: "some place id 60",
          plus_code: {
            compound_code: "",
            global_code: "",
          },
          price_level: 2,
          rating: response.data[i].rating,
          reference: "",
          scope: "",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          user_ratings_total: 861,
          vicinity: response.data[i].resname,
          price: response.data[i].price,
          description: response.data[i].description,
          reviews: response.data[i].Reviews
}
san_francisco.results.push(fetchedRest);


}

    const mocks = {
      "37.7749295,-122.4194155": antwerp,
      "43.653225,-79.383186": toronto,
      "41.878113,-87.629799": chicago,
      "37.7749295,-122.4194155": san_francisco,
    };

    const mock = mocks[loc];

    if (!mock) {
      reject("not found");
    }

    resolve(mock);
  });
});
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
  
    // restaurant.photos = restaurant.photos.map((p) => {
    //   return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    // })
    

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
