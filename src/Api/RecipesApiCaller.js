var axios = require("axios").default;
let WorkoutApi = (()=>{
  let fetchRecipesByFoodType =  async (FoodType)=>{
    console.log("api service ran")
    const options = {
        method: 'GET',
        url: 'https://yummly2.p.rapidapi.com/feeds/list',
        params: {limit: '24', start: '0', tag: FoodType},
        headers: {
          'X-RapidAPI-Host': 'yummly2.p.rapidapi.com',
          'X-RapidAPI-Key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
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
          'X-RapidAPI-Host': 'yummly2.p.rapidapi.com',
          'X-RapidAPI-Key': '19097e14b4mshe9ee505de60f879p107793jsnc1896b9b0bfd'
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
