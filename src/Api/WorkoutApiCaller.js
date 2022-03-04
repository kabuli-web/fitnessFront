var axios = require("axios").default;

 let fetchByBodyPart =  async (bodyPart)=>{
            var options = {
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/target/'+bodyPart,
                headers: {
                  'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
                  'x-rapidapi-key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
                }
              };
              
                let response = await axios.request(options)
                  console.log(response.data);
                  return response.data
              
        
        }
        
    
export default fetchByBodyPart ;