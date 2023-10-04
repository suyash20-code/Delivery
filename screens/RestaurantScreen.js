import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import tw from "twrnc";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import * as Icons from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant, setRestaurant } from "../src/features/counter/restaurantSlice.js";

const RestaurantScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch()
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(()=> {
    dispatch(setRestaurant({
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
    }))
  },[dispatch])
  return (
    <>
    <BasketIcon></BasketIcon>
    <ScrollView>
      <View style={tw.style("relative")}>
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          style={tw.style("w-full h-56 bg-gray-300 p-5")}
        ></Image>
        <TouchableOpacity>
          {/* <Icons.ArrowLeftIcon size={22} color='green'
             style={tw.style("absolute top-14 left-10 p-2 bg-gray-200 rounded-full")}
          ></Icons.ArrowLeftIcon> */}
        </TouchableOpacity>
      </View>

      <View style={tw.style("bg-white")}>
        <View style={tw.style("px-4 pt-4")}>
          <Text style={tw.style("text-3xl font-bold")}>{title}</Text>
          <View style={tw.style("flex-row gap-2 my-1")}>
            
            <View style={tw.style("flex-row items-center gap-1")}>
              <Icons.StarIcon
                size={20}
                color="green"
                opacity={0.5}
              ></Icons.StarIcon>
              <Text style={tw.style("text-xs text-gray-500")}>
                <Text style={tw.style("text-green-500")}>{rating}</Text> .{" "}
                {genre}
              </Text>
            </View>

            <View style={tw.style("flex-row items-center gap-1")}>
              <Icons.MapPinIcon
                size={22}
                color="gray"
                opacity={0.7}
              ></Icons.MapPinIcon>
              <Text style={tw.style("text-xs text-gray-500")}>
                Nearby : {address}
              </Text>
            </View>

          </View>

          <Text style={tw.style("text-gray-500 mt-2 pb-3")}>{short_description}</Text>
        </View>

        <TouchableOpacity style={tw.style("flex-row items-center gap-2 p-4 border-t-2 border-gray-300")}>
          <Icons.QuestionMarkCircleIcon size={20} color="gray" opacity={0.6}></Icons.QuestionMarkCircleIcon>
          <Text style={tw.style("pl-2 flex-1 text-sm font-bold")}>Have a food allergy?</Text>
          <Icons.ChevronRightIcon color="#00CCBB"></Icons.ChevronRightIcon>
        </TouchableOpacity>
      </View>

      <View style={tw.style("pb-36")}>
          <Text style={tw.style("px-4 pt-6 mb-3 font-bold text-xl")}>
            Menu
          </Text>
          {/* Dishes */}
          {dishes.map(dish => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            ></DishRow>
          ))}
      </View>
    </ScrollView>
    </>
  );
};

export default RestaurantScreen;
