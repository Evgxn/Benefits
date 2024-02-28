import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageProps,
  ImageBackground,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { observer, Observer } from "mobx-react-lite";

interface CardItemProps {
  id: number;
  image: ImageProps;
  name: string;
  category?: string;
  discount: string;
  categoryIndex?: number;
  favourite: boolean;
  description?: string;
  toggleFavourite?: any;
}

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

const CardItem: React.FC<CardItemProps> = observer(
  ({
    id,
    image,
    name,
    discount,
    category,
    categoryIndex,
    description,
    favourite,
    toggleFavourite,
  }) => {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", width: 330, marginRight: 15 }}
        >
          <ImageBackground style={styles.image} source={image}>
            {categoryIndex != 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginRight: 20,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    toggleFavourite(favourite, id);
                    favourite && category == "Избранные" ? (
                      LayoutAnimation.configureNext(layoutAnimConfig)
                    ) : (
                      <></>
                    );
                  }}
                >
                  {favourite ? (
                    <View style={styles.cardIcon}>
                      <MaterialIcons name="favorite" size={24} color="blue" />
                    </View>
                  ) : (
                    <View style={styles.cardIcon}>
                      <MaterialIcons
                        name="favorite-border"
                        size={24}
                        color="black"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ) : favourite ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginRight: 20,
                  marginTop: 20,
                }}
              >
                <View style={styles.cardIcon}>
                  <MaterialIcons name="favorite" size={24} color="blue" />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginRight: 20,
                  marginTop: 20,
                  opacity: 0,
                }}
              >
                <View style={styles.cardIcon}>
                  <MaterialIcons name="favorite" size={24} color="blue" />
                </View>
              </View>
            )}

            <View style={styles.discountWrapper}>
              <Text style={styles.discountStyle}>{discount}</Text>
            </View>
          </ImageBackground>

          <Text style={styles.cardName}>{name}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  image: {
    borderRadius: 12,
    height: 200,
    width: 330,
    overflow: "hidden",
  },
  discountStyle: {
    color: "#fff",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  discountWrapper: {
    alignSelf: "flex-start",
    marginTop: 110,
    marginLeft: 15,
    backgroundColor: "#FF245B",
    borderRadius: 100,
  },
  cardIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  cardName: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 20,
    color: "#19224C",
  },
  cardDescription: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#989BB3",
  },
});

export default CardItem;
