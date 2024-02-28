import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DetailsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Тут детали бенефита</Text>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Вернуться назад</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default DetailsScreen;
