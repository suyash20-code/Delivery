import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "../src/features/counter/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../src/features/counter/counterSlice";
import tw from "twrnc";
import * as Icons from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  //console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <View style={tw.style("flex-1 bg-gray-100")}>
        <View
          style={tw.style(
            "p-5 rounded-xl border-b border-[#00CCBB] bg-white shadow-md "
          )}
        >
          <View>
            {/* <Text
              style={tw.style(
                "text-lg font-bold text-center absolute -top-9 right-39"
              )}
            >
              Basket
            </Text> */}
            <Text
              style={tw.style("text-center text-lg font-bold text-gray-400 ")}
            >
              {restaurant.title}
            </Text>
          </View>

          {/* <TouchableOpacity
            onPress={navigation.goBack}
            style={tw.style("rounded-full bg-gray-200 absolute top-2 right-5")}
          >
            <Icons.XCircleIcon
              color="#00CCBB"
              height={50}
              width={50}
            ></Icons.XCircleIcon>
          </TouchableOpacity> */}
        </View>

        <View style={tw.style("flex-row items-center px-4 py-3 bg-white my-5")}>
          <Image
            source={require("../assets/beers-414914_1280.jpg")}
            style={tw.style("h-10 w-10 p-5 mx-2 bg-gray-300 rounded-full")}
          ></Image>
          <Text style={tw.style("flex-1")}>Deliver in 25-30 min</Text>
          <TouchableOpacity>
            <Text style={tw.style("text-[#00CCBB]")}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={tw.style("m-2")}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={tw.style(
                "flex-row items-center gap-3 rounded-full bg-white py-2 px-5 border-b border-[#d7dede] "
              )}
            >
              <Text style={tw.style("text-[#00CCBB]")}>{items.length} x </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={tw.style("h-12 w-12 rounded-full")}
              ></Image>

              <Text style={tw.style("flex-1")}>{items[0]?.name}</Text>

              <Text style={tw.style("text-gray-600")}>
                <Currency quantity={items[0]?.price} currency="INR"></Currency>
              </Text>

              <TouchableOpacity>
                <Text
                  style={tw.style("text-xs font-bold text-red-500")}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={tw.style("p-5 mt-5 bg-white gap-y-4")}>
          <View style={tw.style("flex-row justify-between")}>
            <Text style={tw.style("text-gray-500")}>Subtotal</Text>
            <Text style={tw.style("text-gray-500")}>
              <Currency quantity={basketTotal} currency="INR"></Currency>
            </Text>
          </View>

          <View style={tw.style("flex-row justify-between")}>
            <Text style={tw.style("text-gray-500")}>Delivery Fee</Text>
            <Text style={tw.style("text-gray-500")}>
              <Currency quantity={40.39} currency="INR"></Currency>
            </Text>
          </View>

          <View style={tw.style("flex-row justify-between")}>
            <Text style={tw.style("text-black font-bold")}>Order Total</Text>
            <Text style={tw.style("text-black font-bold")}>
              <Currency quantity={basketTotal + 40.39} currency="INR"></Currency>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            style={tw.style("rounded-lg bg-[#00CCBB] p-4")}
          >
            <Text style={tw.style("text-center text-white text-xl font-bold")}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
