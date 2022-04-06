var axios = require("axios").default;
let WorkoutApi = (()=>{
  let fetchByBodyPartExcercise =  async (bodyPart)=>{
    console.log("api service ran")
          const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + bodyPart,
            headers: {
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
              'X-RapidAPI-Key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
            }
          };
                
                 try {
                  let response = await axios.request(options)
                  console.log(response);
                  return response.data
                 } catch (error) {
                   console.log(error)
                   return error;
                 }
  
          }
    let fetchByBodyParts = async ()=>{
      console.log("api service ran")
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        headers: {
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          'X-RapidAPI-Key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
        }
      };
            
              try {
              let response = await axios.request(options)
              console.log(response);
              return response.data
              } catch (error) {
                console.log(error)
                return error;
              }

            }
            return {
              fetchExercisesByBodyPart:fetchByBodyPartExcercise,
              fetcnbodyparts:fetchByBodyParts
            }
})();

export default WorkoutApi;
