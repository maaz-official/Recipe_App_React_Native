// components/TopMenu.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const TopMenu = ({ navigation }) => {
  return (
    <View style={tw`p-4 flex-row justify-between bg-white shadow-md`}>
      {/* Back Button */}
      <Icon name="arrow-back" size={30} color="#FFA500" onPress={() => navigation.goBack()} />
      
      {/* App Title */}
      <Text style={tw`text-2xl font-bold text-orange-500`}>Home</Text>
      
      {/* Profile Button */}
      <Icon name="person-circle" size={30} color="#FFA500" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
};

export default TopMenu;
