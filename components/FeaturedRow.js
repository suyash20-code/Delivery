import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import tw from "twrnc";
import RestaurantCard from "./RestaurantCard";
import createClient from "../sanity.js";
const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    createClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[] -> {
        ...,
        dishes[]->,
       type-> {
         name
       }
      },
    }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);
  //console.log(restaurants)
  return (
    <View>
      <View style={tw.style("mt-4 flex-row items-center justify-between px-4")}>
        <Text style={tw.style("font-bold text-lg")}>{title}</Text>
        <Icons.ArrowRightIcon size={30} color="#00CCBB"></Icons.ArrowRightIcon>
      </View>
      <Text style={tw.style("text-gray-500 text-xs px-4")}>{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        style={tw.style("pt-4")}
      >
        {restaurants?.map((restaurant) => {
         return (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          ></RestaurantCard>
        )})}
        {/* <RestaurantCard
          id={123}
          imgUrl="https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_640.jpg"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japnese"
          address="123 Main St"
          short_description="This is a short description"
          dishes={[]}
          long={20}
          lat={0}
        ></RestaurantCard> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
