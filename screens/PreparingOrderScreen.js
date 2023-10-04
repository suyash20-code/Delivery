import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation = useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("Delivery")
        }, 4000)
    },[])
  return (
    <SafeAreaView style={tw.style("bg-[#4e4c69] flex-1 justify-center items-center")}>
        <Animatable.Image
            source={require("../assets/processing.gif")}
            animation="slideInLeft"
            iterationCount={1}
            style={tw.style("h-64 w-95")}
        ></Animatable.Image>

        <Animatable.Text
            animation="slideInUp"
            iterationCount={1}
            style={tw.style("text-lg my-10 text-white font-extrabold text-center")}
        >
            Waiting for Restaurant to accept your order!
        </Animatable.Text>

        <Progress.Bar  progress={0.8} width={200} color='white'/>

    </SafeAreaView>
  )
}

export default PreparingOrderScreen