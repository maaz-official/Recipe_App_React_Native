// SplashScreen.js
import { Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { router } from 'expo-router';
import Loader from '../components/Loader'; // Import the Loader component

const SplashScreen = () => {
  const [loading, setLoading] = useState(false); // Manage loading state

  const handleGetStarted = () => {
    setLoading(true);  // Show the loader
    setTimeout(() => {
      router.push({ pathname: '/home' });  // Navigate to home screen
      setLoading(false);  // Hide the loader after navigation
    }, 2000);  // Simulating a 2 second loading time
  };

  return (
    <View style={tw`flex-1 bg-orange-500 justify-center items-center`}>
      <View style={tw`justify-center items-center`}>
        <Image source={require('../assets/splash-image.png')} style={tw`w-70 h-70`} />
        <Text style={tw`text-5xl font-bold text-white mt-6`}>Recipes App</Text>
        <Text style={tw`text-lg text-white font-semibold mt-2`}>
          Recipes Here, Get Yours Now!
        </Text>
      </View>

      {/* Get Started Button */}
      <Pressable 
        onPress={handleGetStarted} 
        style={tw`bg-white mt-10 py-3 px-10 rounded-full`}>
        {
          loading ? (
            <Loader />  // Use the Loader component here
          ) : (
            <Text style={tw`text-orange-500 font-semibold text-lg`}>Get Started</Text>
          )
        }
      </Pressable>
    </View>
  );
};

export default SplashScreen;
