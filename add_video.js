  var firebase = require("firebase");

  var config = {
    apiKey: "AIzaSyCyIHvwltsyvdAO3zZsVBN2A-5D7GLxCwY",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
  };
  firebase.initializeApp(config);
  
  console.log('starting to add...');
  var linkMapRef = firebase.database().ref().child("linkMap");
  linkMapRef.push().set( {
		id: 'P9vI9oYLrIc',
		name: 'Barney - Where is Thumbkin',
		rank: 3
	});
  linkMapRef.push().set( {
		id: 'ePHB7c4sn2M',
		name: 'Barney - Sally The Camel',
		rank: 3
	});
  linkMapRef.push().set( {
		id: 'AsAzI4Jdsj0',
		name: 'Barney - The Wheels on the Bus',
		rank: 3
	});
  console.log('finished.');
  timeout = setTimeout(() => {process.exit();}, 3000);
  //process.exit();
