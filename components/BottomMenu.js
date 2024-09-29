// components/BottomMenu.js
import React from 'react';
import { View, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const BottomMenu = ({ navigation }) => {
  return (
    <View style={tw`flex-row justify-between items-center p-4 bg-white shadow-lg border-t border-gray-200`}>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings-outline" size={30} color="#FFA500" style={tw`ml-5`} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('recipes')}>
        <View style={tw`p-4 bg-orange-500 rounded-full`}>
          <Icon name="fast-food-outline" size={30} color="#FFF" />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Icon name="person-circle-outline" size={30} color="#FFA500" style={tw`mr-5`} />
      </Pressable>
    </View>
  );
};

export default BottomMenu;
