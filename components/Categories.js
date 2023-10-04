import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import createClient from "../sanity";
import { urlFor } from "../sanity.js";
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    createClient
      .fetch(
        `
    *[_type == "category"] 
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  //console.log(categories);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}

      {categories.map((category) => {
      return (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      )})}
      {/* <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2018/05/24/04/58/tag-3425877_1280.jpg"
        title="Offers"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
        title="Pizza"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2017/01/29/16/23/burger-2018627_1280.jpg"
        title="Burger"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2017/05/10/13/55/french-fries-2300928_1280.jpg"
        title="Fries"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2017/10/16/09/00/sushi-2856544_1280.jpg"
        title="Sushi"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2016/10/31/18/23/salad-1786327_1280.jpg"
        title="Salad"
      />
      <CategoryCard
        imgUrl="https://cdn.pixabay.com/photo/2016/11/29/12/52/coffee-1869647_1280.jpg"
        title="Tea & Coffee"
      /> */}
    </ScrollView>
  );
};

export default Categories;
