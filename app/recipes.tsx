import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, Pressable, ScrollView } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import { fetchRecipes } from '../api/edamam'; // Import the fetchRecipes function
import Search from '../components/Search'; // Import the Search component
import TopMenu from '../components/Menu'; // Import the TopMenu component
import BottomMenu from '../components/BottomMenu'; // Import the BottomMenu component
import { useNavigation } from '@react-navigation/native';

const Recipes = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState(''); // State for managing search query
  const [recipes, setRecipes] = useState([]); // State for recipes fetched from the API
  const [loading, setLoading] = useState(false); // State for managing loading

  // Fetch recipes from Edamam API when the search query changes
  useEffect(() => {
    if (searchQuery) {
      const fetchAPIRecipes = async () => {
        setLoading(true);
        const fetchedRecipes = await fetchRecipes(searchQuery);
        setRecipes(fetchedRecipes);
        setLoading(false);
      };
      fetchAPIRecipes();
    }
  }, [searchQuery]);

  return (
    <View style={tw`flex-1`}>
      {/* Top Menu */}
      <TopMenu navigation={navigation} />

      <ScrollView style={tw`flex-1 bg-gray-100`}>
        {/* Search Component */}
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Recipes Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-2xl font-bold text-gray-800 ml-4 mb-4`}>All Recipes</Text>
          
          {loading ? (
            <Text style={tw`text-center text-lg text-gray-500`}>Loading...</Text>
          ) : recipes.length > 0 ? (
            recipes.map((recipeData, index) => {
              const recipe = recipeData.recipe; // Access the actual recipe data
              return (
                <Animatable.View
                  key={index}
                  animation="slideInUp"
                  duration={1000}
                  delay={index * 150}
                  style={tw`bg-white p-4 m-2 rounded-lg shadow-lg flex-row`}
                >
                  {/* Recipe Image */}
                  <Image source={{ uri: recipe.image }} style={tw`w-20 h-20 rounded-lg mr-4`} />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-xl font-bold text-gray-900`}>{recipe.label}</Text>
                    <Text style={tw`text-sm text-gray-600 mt-1`}>{recipe.source}</Text>
                  </View>
                </Animatable.View>
              );
            })
          ) : (
            <Text style={tw`text-center text-lg text-gray-500`}>No recipes found</Text>
          )}
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <BottomMenu navigation={navigation} />
    </View>
  );
};

export default Recipes;
