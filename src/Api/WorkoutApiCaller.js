var axios = require("axios").default;
let WorkoutApi = (()=>{
  let fetchByBodyPartExcercise =  async (bodyPart)=>{
    console.log("api service ran")
          const options = {
            method: 'GET',
            url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + bodyPart,
            headers: {
              'X-RapidAPI-Host': process.env.RAPID_HOST,
              'X-RapidAPI-Key': process.env.RAPID_KEY
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
          'X-RapidAPI-Host': process.env.RAPID_HOST,
          'X-RapidAPI-Key': process.env.RAPID_KEY
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
