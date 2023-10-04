import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import * as Icons from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../src/features/counter/counterSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  
  //console.log('render');
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  }; 
  //console.log(items);
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={tw.style("bg-white border p-4 border-gray-200")}
      >
        <View style={tw.style("flex-row")}>
          <View style={tw.style("flex-1 pr-2")}>
            <Text style={tw.style("text-lg mb-1")}>{name}</Text>
            <Text style={tw.style("text-gray-500")}>{description}</Text>
            <Text style={tw.style("text-gray-400 mt-2")}>
              <Currency quantity={price} currency="INR"></Currency>
            </Text>
          </View>

          <View style={tw.style("justify-center items-center")}>
            <Image
              // style={{
              //     borderWidth:1,
              //     borderColor:"#F3F3F4",
              // }}
              source={{ uri: urlFor(image).url() }}
              style={tw.style(
                "h-20 w-20 bg-gray-300 p-4 borderWidth:1 borderColor:#F3F3F4"
              )}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={tw.style("bg-white px-4")}>
          <View style={tw.style("flex-row items-center gap-2 pb-3")}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <Icons.MinusCircleIcon
                color="gray"
                size={40}
              ></Icons.MinusCircleIcon>
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <Icons.PlusCircleIcon
                color="#796cf5"
                size={40}
              ></Icons.PlusCircleIcon>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
