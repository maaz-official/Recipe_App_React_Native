import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Pressable, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import recipesData from '../assets/data/recipesData.json';
import Loader from '../components/Loader'; // Import the Loader component
import Search from '../components/Search'; // Import the Search component
import BottomMenu from '../components/BottomMenu'; // Correct import for BottomMenu component
import TopMenu from '../components/Menu'; // Correct import for TopMenu component
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true); // State for managing loader
    const { categories, latestRecipes } = recipesData;

    const [searchQuery, setSearchQuery] = useState(''); // State for managing search query
    const [filteredRecipes, setFilteredRecipes] = useState(latestRecipes); // State for filtered recipes

    // Filter recipes based on the search query
    useEffect(() => {
        setFilteredRecipes(
            latestRecipes.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, latestRecipes]);

    useEffect(() => {
        // Simulate loading time (you can replace this with an API call)
        const timer = setTimeout(() => {
            setLoading(false); // Hide loader after data is "loaded"
        }, 1000); // Simulate a 1-second load time

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    const brandAnimation = {
        0: { opacity: 0, translateY: -20 },
        1: { opacity: 1, translateY: 0 },
    };

    if (loading) {
        return <Loader />; // Show loader while loading
    }

    return (
        <View style={tw`flex-1`}>
            {/* Top Menu */}
            <TopMenu navigation={navigation} />

            <ScrollView style={tw`flex-1 bg-gray-100`}>
                {/* Welcome Section */}
                <Animatable.View animation={brandAnimation} duration={800} style={tw`mt-6 mb-6 items-center`}>
                    <Text style={tw`text-3xl font-bold text-orange-500`}>Welcome to Recipes App</Text>
                    <Text style={tw`text-lg font-semibold text-gray-600 mt-2`}>Find the best recipes here!</Text>
                </Animatable.View>

                {/* Search Component */}
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* Categories Section */}
                <View style={tw`mb-6 mt-6`}>
                    <Text style={tw`text-2xl font-bold text-gray-800 ml-4 mb-4`}>Categories</Text>
                    <FlatList
                        data={categories}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Animatable.View
                                animation="fadeIn"
                                duration={1000}
                                delay={300}
                                style={tw`bg-orange-300 p-4 m-2 rounded-lg shadow-lg`}>
                                <Text style={tw`text-lg text-white font-semibold`}>{item.name}</Text>
                            </Animatable.View>
                        )}
                    />
                </View>

                {/* Latest Recipes Section */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-2xl font-bold text-gray-800 ml-4 mb-4`}>Latest Recipes</Text>
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.slice(0, 10).map((recipe, index) => (
                            <Animatable.View
                                key={recipe.id}
                                animation="slideInUp"
                                duration={1000}
                                delay={index * 150}
                                style={tw`bg-white p-4 m-2 rounded-lg shadow-lg flex-row`}>
                                {/* Recipe Image */}
                                <Image
                                    source={{ uri: recipe.image }}
                                    style={tw`w-20 h-20 rounded-lg mr-4`}
                                />
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-xl font-bold text-gray-900`}>{recipe.name}</Text>
                                    <Text style={tw`text-sm text-gray-600 mt-1`}>{recipe.description}</Text>
                                </View>
                            </Animatable.View>
                        ))
                    ) : (
                        <Text style={tw`text-center text-lg text-gray-500`}>No recipes found</Text>
                    )}
                </View>

                {/* See More Button */}
                <Animatable.View animation="fadeInUp" duration={1000} style={tw`items-center mb-10`}>
                    <Pressable
                        onPress={() => router.push('recipes')} // Correctly navigate to the full recipes page
                        style={tw`bg-orange-500 py-3 px-10 rounded-full shadow-lg`}>
                        <Text style={tw`text-white text-lg font-semibold`}>See More</Text>
                    </Pressable>
                </Animatable.View>
            </ScrollView>

            {/* Bottom Menu */}
            <BottomMenu navigation={navigation} />
        </View>
    );
};

export default Home;
