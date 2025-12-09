import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ViewLooperComponent = () => {
  const dataItems = [
    { id: '1', title: '860 319 1074', message: 'This is a message' },
    { id: '2', title: '123 456 7890', message: 'This is a message' },
    { id: '3', title: '860 608 1411', message: 'This is a message' },
    { id: '4', title: '203 856 0357', message: 'This is a message' },
  ];

  return (
    <SafeAreaView style={Styles.container}>
      {/* Loop through the dataItems array */}
        <View style={Styles.topContainer}>
            <Text style={Styles.titleText}>TEXT MESSAGES</Text>
        </View>

      {dataItems.map((item, index) => (
        <React.Fragment key={item.id}>
            <View style={[Styles.itemView]}>
                <Text style={Styles.phoneNumber}>{item.title}</Text>
                <Text style={Styles.textMessage}>{item.message}</Text>
            </View>

      {index < dataItems.length - 1 && (
        <View style={Styles.borderLine}></View>
      )}
    </React.Fragment>
      ))}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2dff',
    alignItems: 'center',
    gap: 0,
  },
  topContainer:{
    width: screenWidth,
    height: screenHeight *.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLine: {
    width: screenWidth * .95,
    height: 1, 
    backgroundColor: '#7b7b7bff',
    zIndex: 2,
  },
  titleText: {
    color: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 40,
  },
  itemView: {
    width: screenWidth,
    height: screenHeight * .1,
    backgroundColor: 'rgba(70, 70, 70, 1)',
    gap: 10,
    borderRadius: 3,
    margin: -1,
    zIndex: 1,
  },
  phoneNumber: {
    color: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  textMessage: {
    color: '#b09f9fff',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default ViewLooperComponent;
