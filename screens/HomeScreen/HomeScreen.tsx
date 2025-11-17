import { View, Text, Dimensions, StyleSheet, StatusBar, ScrollView, Image, Button, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Animated, { Extrapolation, interpolate, scrollTo, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, useAnimatedRef, SharedValue } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';


const { width } = Dimensions.get('screen');


const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const initialX = width * 4;


type CarouselItemProps = {
   image: string;
   index: number;
   scrollX: SharedValue<number>;
};


const CarouselItem = ({ image, index, scrollX }: CarouselItemProps) => {
   const AnimatedStyle = useAnimatedStyle(() => {
       return {
           transform: [
               {
                   translateX: interpolate(
                       scrollX.value,
                       [(index - 1) * width, index * width, (index + 1) * width],
                       [-width * .25, 0, width * .25],
                       Extrapolation.CLAMP
                   ),
               },
               {
                   scale: interpolate(
                       scrollX.value,
                       [(index - 1) * width, index * width, (index + 1) * width],
                       [.9, 1, .9],
                       Extrapolation.CLAMP
                   )
               }
           ]
       };
   });


   return (
       <Animated.View
           style={[Styles.imageContainer, AnimatedStyle]}
       >
           <Image
               source={{ uri: image }}
               resizeMode='cover'
               style={Styles.image}
           />
       </Animated.View>
   );
};

const HomeScreen = ({navigation}:{navigation:any}) => {

        const [images, setImages] = useState<string[]>([]);
        const [isLoading, setIsLoading] = useState(true);

    const scrollX = useSharedValue(0);
    const isScrolling = useSharedValue(false);
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const [isInitialized, setIsInitialized] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/homescreen-data'); 
            // The response.data should have the structure { data: [...] }
            const responseData = response.data

            if (responseData && responseData.length > 0) {
                const firstObject = responseData[0];

                const imageUrls = firstObject.url;
                console.log(imageUrls);
                setImages(imageUrls);
            } else {
            console.log("No data found in the response for images.");
            setImages([]);
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
            Alert.alert("Error", "Failed to fetch data from the server.");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onScrollHandler = useAnimatedScrollHandler({
       onScroll: (event) => {
           scrollX.value = event.contentOffset.x
           isScrolling.value = true;
           console.log(scrollX.value);
       },
       onMomentumEnd: event => {
           isScrolling.value = false;
          
           if (isScrolling.value == false && (scrollX.value <= width || scrollX.value >= width * 7)) {
                if((scrollX.value <= width * 0)){
                   scrollTo(animatedRef, (width * 3), 0, false);
               }
               else if((scrollX.value >= 3216)){
                   scrollTo(animatedRef, (width * 5), 0, false);
               }
               else
                //console.log("teleporting");
                scrollTo(animatedRef, (width * 4), 0, false);
           }

       },
   });

    const handleContinuePress = () => {
        //Alert.alert("Button Pressed!", "This will bring users to next page!");
        navigation.navigate("LogIn");
    };

    if (isLoading) {
        return (
            <View style={Styles.container}>
                <ActivityIndicator size="large" color="#7c7085ff" />
                <Text>Loading images...</Text>
            </View>
        );
    }


   return (
       <View style={Styles.container}>
           <Text style={Styles.titleText}>Title</Text>
           <View style={Styles.carouselContainer}>
               <StatusBar hidden />

               <Animated.ScrollView
                   showsHorizontalScrollIndicator={false}
                   horizontal={true}
                   pagingEnabled={true}
                   onScroll={onScrollHandler}
                   scrollEventThrottle={16}
                   overScrollMode={'never'}
                   scrollToOverflowEnabled={false}
                   ref={animatedRef}
                   onLayout={() => {
                       if (!isInitialized) {
                           animatedRef.current?.scrollTo({ x: initialX, y: 0, animated: false });
                           setIsInitialized(true);
                       }
                   }}
               >
                   {images.map((image, index) => ( 
                       <CarouselItem
                           key={`image_${index}`}
                           image={image}
                           index={index}
                           scrollX={scrollX}
                       />
                   ))}
               </Animated.ScrollView>
               <Text></Text>
           </View>

        <Pressable
            onPress={handleContinuePress}
            style={({ pressed }) => pressed ? Styles.buttonPressed : Styles.buttonNormal}
        >
            <Text style={Styles.buttonText}>Press Me</Text>
        </Pressable>
       </View>   
   )
}


export default HomeScreen


const Styles = StyleSheet.create({
   container: {
       backgroundColor: '#ffffffff',
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
   carouselContainer: {
       height: (IMAGE_HEIGHT * 1.25), 
   },
   image: {
       width: IMAGE_WIDTH,
       height: IMAGE_HEIGHT,
       borderRadius: 16,
   },
   imageContainer: {
       width: width,
       justifyContent: 'center',
       alignItems: 'center',
       shadowColor: '#000',
       shadowOffset: {
           width: 0,
           height: 0,
       },
       shadowRadius: 20,
       shadowOpacity: 0.5,
       elevation: 10,
   },
   titleText: {
       fontSize: 36,
       fontFamily: 'system',
   },
      buttonNormal: {
        backgroundColor: '#7c7085ff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonPressed: {
        backgroundColor: '#544c5cff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        opacity: 0.7,
    },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
      },
    });