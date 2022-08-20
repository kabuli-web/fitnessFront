var axios = require("axios").default;
let WorkoutApi = (()=>{
  let fetchRecipesByFoodType =  async (FoodType)=>{
    console.log("api service ran")
    const options = {
        method: 'GET',
        url: 'https://yummly2.p.rapidapi.com/feeds/list',
        params: {limit: '24', start: '0', tag: FoodType},
        headers: {
          'X-RapidAPI-Host': process.env.RAPID_HOST,
          'X-RapidAPI-Key': process.env.RAPID_KEY
        }
      };        
                 try {
                  let response = await axios.request(options)
                  console.log(response);
                  return response.data.feed
                 } catch (error) {
                   console.log(error)
                   return error;
                 }
  
          }
    let fetchFoodTypes = async ()=>{
      console.log("api service ran")
      const options = {
        method: 'GET',
        url: 'https://yummly2.p.rapidapi.com/categories/list',
        headers: {
          'X-RapidAPI-Host': process.env.RAPID_HOST,
          'X-RapidAPI-Key': process.env.RAPID_KEY
        }
      };
              try {
              let response = await axios.request(options)
              console.log(response);
              return response.data["browse-categories"]
              } catch (error) {
                console.log(error)
                return error;
              }
            }
            return {
                fetchRecipesByFoodType:fetchRecipesByFoodType,
                fetchFoodTypes:fetchFoodTypes
            }
})();

export default WorkoutApi;
