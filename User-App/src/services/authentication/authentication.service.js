/* eslint-disable prettier/prettier */
//import {signInWithEmailAndPassword} from "firebase/auth";

import SERVERACCESS from "../../../SERVERACCESS";



export const loginRequest = async (auth, email, password) =>{

  const response = await fetch( SERVERACCESS+"/auth/login",{

    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })

  });

  const json = await response.json()

  // console.log(json);


  const getuser = await fetch(SERVERACCESS + "/auth/getuser",{

  method: 'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(
    json
  )

});

// console.log(JSON.stringify(json.errors));


if(json.errors == undefined){
  return (await getuser.json());
}
else{
  //console.log( await getuser.json());
  return (json);
}

}
 


// signInWithEmailAndPassword(auth, email, password);
