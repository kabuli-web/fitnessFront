var axios = require("axios").default;

 let fetchByBodyPart = (
     ()=>{
         var fetchWorkouts = (bodyPart)=>{
            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/target/'+bodyPart,
                headers: {
                  'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                  'x-rapidapi-key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
                }
              };
              
              axios.request(options).then(function (response) {
                  console.log(response.data);
                  return response.data
              }).catch(function (error) {
                  console.error(error);
                  return null;
              });
        
        }
        return {
            getWorkouts: fetchWorkouts
        }
     }
 )();
export default fetchByBodyPart ;