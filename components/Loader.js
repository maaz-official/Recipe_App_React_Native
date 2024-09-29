// components/Loader.js
import React from 'react';
import { ActivityIndicator } from 'react-native';
import tw from 'twrnc';

const Loader = () => {
  return (
    <ActivityIndicator size="small" color="#FFA500" style={tw`my-3`} />
  );
};

export default Loader;
