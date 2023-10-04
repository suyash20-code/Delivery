import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";
import Categories from "../components/Categories.js";
import FeaturedRow from "../components/FeaturedRow.js";
import createClient  from "../sanity.js";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerShown: false,
  //     });
  //   }, []);

  useEffect(() => {
    createClient   
      .fetch(
        `*[_type == "featured"] {
      ...,
      restaurants[] -> {
        ...,
        dishes[]->,
       
      }
    }`
      )
      .then((data) => setFeaturedCategories(data));
  }, []);
  //console.log(featuredCategories);
  return (
    <SafeAreaView style={tw.style("bg-white pt-4")}>
      {/* Header */}

      <View style={tw.style("flex-row pb-4 items-center mx-2 gap-2 px-2")}>
        <Image
          source={require("../assets/beers-414914_1280.jpg")}
          style={tw.style(" h-10 w-10 p-4 rounded-full")}
        />

        <View style={tw.style("flex-1")}>
          <Text style={tw.style("font-bold text-gray-500 text-sm")}>
            Deliver Now!
          </Text>
          <Text style={tw.style("font-bold text-xl")}>
            Current Location
            <Icons.ChevronDownIcon color="#00CC88" size={20} />
          </Text>
        </View>
        <Icons.UserIcon size={35} color="#00CC88"></Icons.UserIcon>
      </View>

      {/* Search */}
      <View style={tw.style("flex-row items-center gap-2 pb-2 mx-4 ")}>
        <View style={tw.style("flex-row flex-1 bg-gray-200 gap-3 p-2")}>
          <Icons.MagnifyingGlassIcon
            color="#00CCBB"
            size={25}
          ></Icons.MagnifyingGlassIcon>
          <TextInput
            placeholder="Restaurants and Cuisunes"
            keyboardType="default"
          ></TextInput>
        </View>
        <Icons.AdjustmentsVerticalIcon color="#00CCBB"></Icons.AdjustmentsVerticalIcon>
      </View>

      {/* ScrollView */}
      <ScrollView
        style={tw.style("bg-gray-100")}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}

        <Categories/>

        {/* Featured  */}
        {featuredCategories?.map((category) => {
        return (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          ></FeaturedRow>
        )})}
        {/* <FeaturedRow
            id="123"
            title="pizzas"
            description="paid"
          ></FeaturedRow> */}
          
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
