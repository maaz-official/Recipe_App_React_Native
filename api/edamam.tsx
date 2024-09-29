import axios from 'axios';

export const fetchRecipes = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=ec8f11ab&app_key=80526ec2d8717ca8f0ccaebe13b3bd61`
    );
    return response.data.hits; // Return the array of recipes
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
