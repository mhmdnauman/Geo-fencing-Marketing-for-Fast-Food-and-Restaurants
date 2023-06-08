import SERVERACCESS from "../../../SERVERACCESS";

export const createUserWithEmailAndPassword = async (name, username, email, password, repeatedPassword, phoneNumber) =>{


  console.log("username:"+username+
  "name"+name+
  "email"+email +
  "password"+ password+
  "phoneNo"+phoneNumber)


    const signUp = await fetch(SERVERACCESS + "/auth/signupdp",{

    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username":username,
        "name":name,
        "email":email,
        "password": password,
        "phoneNo":phoneNumber
    })

  });
  

  const signedUp = await signUp.json()

  
  const response = await fetch( SERVERACCESS+"/auth/logindp",{

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


  const getuser = await fetch(SERVERACCESS + "/auth/getuserdp",{

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