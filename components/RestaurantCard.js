import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as Icons from "react-native-heroicons/solid";
import {urlFor} from '../sanity.js'
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={()=> {
        navigation.navigate('Restaurant', {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        })
    }}
    style={tw.style("bg-white mr-3 shadow rounded-md")}>
        <Image
            source={{
                uri: urlFor(imgUrl).url(),
            }}
            style={tw.style("h-36 w-64 rounded-md")}
        ></Image>

        <View style={tw.style("pb-4 px-3")}>
            <Text style={tw.style("font-bold text-lg pt-2")}>{title}</Text>
            <View style={tw.style("flex-row items-center gap-1")}>
                <Icons.StarIcon size={22} color='green' opacity={0.5}></Icons.StarIcon>
                <Text style={tw.style("text-sm text-green-600")}>
                    <Text style={tw.style("text-green-600")}>{rating} </Text>. {genre}
                </Text>
            </View>
            <View style={tw.style("flex-row items-center gap-1")}>
                <Icons.MapPinIcon size={22} color='gray' opacity={0.4}></Icons.MapPinIcon>
                <Text style={tw.style("text-xs text-gray-600")}>Nearby . {address}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard