const GetT = require('./index');

var trains = GetT.gettime().then(data=>{
    console.log(data)
},data=>{
    console.log(data)
})
