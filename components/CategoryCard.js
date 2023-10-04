import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity style={tw.style('relative mr-2')}>
        <Image source={{
            uri:imgUrl
        }}
        style={tw.style('h-20 w-20 rounded')}></Image>
      <Text style={tw.style('absolute bottom-1 left-2 text-white font-bold')}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard