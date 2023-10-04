import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../src/features/counter/counterSlice";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;
  return (
    <View style={tw.style("absolute bottom-10 w-full z-50")}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={tw.style(
          "mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center gap-1"
        )}
      >
        <Text
          style={tw.style(
            "text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-lg"
          )}
        >
          {items.length}
        </Text>
        <Text
          style={tw.style(
            "flex-1 text-white text-center text-lg font-extrabold"
          )}
        >
          View Basket
        </Text>
        <Text style={tw.style("text-lg text-white font-extrabold")}>
          <Currency quantity={basketTotal} currency="INR"></Currency>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
