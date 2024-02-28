import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import CardItem from "../components/HomeScreen/CardItem";

const FavoriteScreen = observer(({ navigation }: any) => {
  const { favoritesList, addFavoriteList, deleteFavoriteList } = useStore();

  const ToggleFavourite = (
    favourite: boolean,
    id: number,
    category: string
  ) => {
    favourite ? deleteFavoriteList(id) : addFavoriteList(id);
  };

  return (
    <View
      style={[
        styles.container,
        favoritesList.length == 0 ? { justifyContent: "center" } : {},
      ]}
    >
      <View>
        {favoritesList.length > 0 ? (
          <Text style={styles.headerText}>Избранное</Text>
        ) : (
          <></>
        )}

        <FlatList
          style={styles.shopFlatList}
          data={[...favoritesList]}
          ListEmptyComponent={
            <View style={styles.imageWrapper}>
              <Image
                style={styles.imageWithoutItem}
                source={require("../assets/images/favourite/cards.png")}
              ></Image>
              <Text style={styles.textWithoutItem}>Нет избранного</Text>
              <Text style={styles.descriptionWithoutItem}>
                Чтобы добавить любимые скидки, просто нажими на иконку 💙️ в
                карточке
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.push("Details")}>
                <CardItem
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  category="Избранные"
                  description={item.description}
                  discount={item.discount}
                  favourite={item.favourite}
                  toggleFavourite={ToggleFavourite}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  textWithoutItem: {
    marginTop: 20,
    marginBottom: 15,
    color: "#19224C",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
  },
  descriptionWithoutItem: {
    color: "#989BB3",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  imageWithoutItem: {
    height: 150,
    width: 200,
  },
  imageWrapper: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 12,
    height: 150,
    width: 270,
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
    top: 110,
    left: 30,
    bottom: 0,
    backgroundColor: "#FF245B",
    borderRadius: 100,
  },
  cardIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 100,
    left: 190,
    alignItems: "center",
    justifyContent: "center",
  },
  shopFlatList: {
    height: "auto",
  },
  headerText: {
    marginBottom: 10,
    paddingLeft: 12,
    color: "#19224C",
    fontWeight: "700",
    fontSize: 28,
    lineHeight: 28,
  },
});

export default FavoriteScreen;
