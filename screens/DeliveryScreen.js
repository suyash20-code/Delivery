import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from '../src/features/counter/restaurantSlice';
import tw from 'twrnc'
import * as Icons from "react-native-heroicons/solid";
import * as Progress from 'react-native-progress';
import MapView, {Marker} from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant) 
  return (
    <View style={tw.style("bg-[#00CCBB] flex-1")}>
        <SafeAreaView style={tw.style("z-50")}>
            <View style={tw.style("flex-row justify-between items-center p-5")}>
                <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
                    <Icons.XMarkIcon color="white" size={30}></Icons.XMarkIcon>
                </TouchableOpacity>
                <Text style={tw.style("font-light text-white text-lg")}>Order Help</Text>
            </View>

            <View style={tw.style("bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md")}>
                <View style={tw.style("flex-row justify-between")}>
                <View>
                    <Text style={tw.style("text-lg text-gray-400")}>Estimated Arrival</Text>
                    <Text style={tw.style("text-4xl font-bold")}>25-35 Minutes</Text>
                </View>

                <Image
                    source={require("../assets/pngegg.png")}
                    style={tw.style("h-15 w-15")}
                ></Image>
                </View>

                <Progress.Bar size={30} indeterminate={true} progress={0.8} width={200} color='#00CCBB'/>

                <Text style={tw.style("mt-3 text-gray-500")}>
                    Your order at {restaurant.title} is being prepared
                </Text>
            </View>
        </SafeAreaView>
    <MapView
        initialRegion={{
            latitude:restaurant.lat,
            longitude:restaurant.long,
            latitudeDelta:0.005,
            longitudeDelta:0.005,
        }
    }
    style={tw.style("flex-1 -mt-10 z-0")}
    mapType='mutedStandard'
    >
        <Marker
            coordinate={{
                latitude:restaurant.lat,
                longitude:restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier='origin'
            pinColor='#000CCBB'
        ></Marker>
    </MapView>
    <SafeAreaView style={tw.style("flex-row bg-white items-center gap-5 h-20")}>
        <Image
        source={require("../assets/PngItem_37779.png")}
        style={tw.style("h-12 w-12 bg-gray-300 p-4 rounded-full ml-5")}
        ></Image>

        <View style={tw.style("flex-1")}>
            <Text style={tw.style("text-lg")}>Suyash Padwal</Text>
            <Text style={tw.style("text-gray-500")}>Your Rider</Text>
        </View>
        <Text style={tw.style("text-[#00CCBB] text-lg mr-5 font-bold")}>Call</Text>
    </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen