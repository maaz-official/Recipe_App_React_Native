// components/Search.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient'; // Use Expo's LinearGradient
import tw from 'twrnc';

const Search = ({ searchQuery, setSearchQuery }) => {
  const [internalQuery, setInternalQuery] = useState(searchQuery); // Local state to manage search input
  const [isTyping, setIsTyping] = useState(false); // State to show typing feedback

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(internalQuery);
      setIsTyping(false); // Stop typing feedback
    }, 500); // Delay of 500ms before triggering the search

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce on unmount
  }, [internalQuery]);

  return (
    <LinearGradient
      colors={['#FFA500', '#FF7F50']}
      style={tw`p-1 rounded-full shadow-lg mt-4 mx-4`}
    >
      <View style={tw`bg-white flex-row items-center p-2 rounded-full`}>
        {/* Search Icon */}
        <Icon name="search" size={28} color="#FFA500" style={tw`ml-3`} />

        {/* Search Input */}
        <TextInput
          placeholder="Search Recipes..."
          placeholderTextColor="#888"
          style={tw`flex-1 text-lg p-2 ml-3 text-gray-700`}
          value={internalQuery}
          onChangeText={(text) => {
            setInternalQuery(text);
            setIsTyping(true); // Start typing feedback
          }}
        />

        {/* Clear Button */}
        {internalQuery.length > 0 && (
          <Pressable onPress={() => setInternalQuery('')} style={tw`mr-3`}>
            <Icon name="close-circle" size={28} color="#888" />
          </Pressable>
        )}
      </View>
    </LinearGradient>
  );
};

export default Search;
