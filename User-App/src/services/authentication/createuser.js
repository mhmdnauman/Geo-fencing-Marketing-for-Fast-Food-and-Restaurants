import SERVERACCESS from "../../../SERVERACCESS";

export const createUserWithEmailAndPassword = async (name, username, email, password, repeatedPassword, phoneNumber, lat,  long, address) =>{


  console.log(name, username, email, password, repeatedPassword, phoneNumber, lat,  long, address);

    const signUp = await fetch(SERVERACCESS + "/auth/signup",{

    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username":username,
        "name":name,
        "email":email,
        "password": password,
        "phoneNo":phoneNumber,
        "lat":lat,
        "long":long,
        "address": address 
    })

  });

  const signedUp = await signUp.json()

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