import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SectionList,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import CardItem from "../components/HomeScreen/CardItem";

import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = observer(({ navigation }: any) => {
  const {
    data,
    addFavoriteList,
    deleteFavoriteList,
    getShopList,
    shopList,
    categories,
  } = useStore();

  const ToggleFavourite = (favourite: boolean, id: number) => {
    favourite ? deleteFavoriteList(id) : addFavoriteList(id);
  };

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const listRef: any = useRef<FlatList>();

  const onNavigation = () => {
    navigation.push("Details");
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => {
            listRef.current.scrollToIndex({
              index: index,
              viewPosition: 0.5,
            });
            setCategoryIndex({
              index: index,
              category: categories[index],
            });
            [...getShopList(categories[index])];
          }}
        >
          <View
            style={[
              categoryIndex.index == index
                ? styles.activeCategory
                : styles.noActiveCategory,
            ]}
          >
            <Text
              style={[
                categoryIndex.index == index
                  ? styles.activeCategoryName
                  : styles.noActiveCategoryName,
              ]}
            >
              {item == "Все скидки" ? (
                <View
                  style={[
                    categoryIndex.index == index
                      ? styles.activeCategoryWithIcon
                      : styles.noActiveCategoryWithIcon,
                  ]}
                >
                  <FontAwesome5
                    style={styles.categoryIcon}
                    name="fire"
                    size={14}
                    color={categoryIndex.index == index ? "#fff" : "#000"}
                  />
                  <Text
                    style={[
                      categoryIndex.index == index
                        ? styles.activeCategoryName
                        : styles.noActiveCategoryName,
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              ) : (
                item
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderSectionHeader = ({ section }: any) => (
    <>
      <View style={styles.categoryWrapper}>
        <View>
          <Text style={styles.sectionCategory}>{section.category}</Text>
        </View>
        {categoryIndex.index == 0 && section.category != "Новинки" ? (
          <TouchableOpacity
            onPress={() => {
              listRef?.current?.scrollToIndex({
                index: categories.indexOf(section.category),
                viewPosition: 0.5,
                animated: true,
                offset: 0,
              });

              setCategoryIndex({
                index: categories.indexOf(section.category),
                category: categories[categories.indexOf(section.category)],
              });
              [
                ...getShopList(
                  categories[categories.indexOf(section.category)]
                ),
              ];
            }}
          >
            <View>
              <Text style={{ color: "#2F50F4" }}>Все</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      {categoryIndex.index == 0 ? (
        <FlatList
          style={styles.shopFlatList}
          data={
            section.category != "Новинки"
              ? section.data.slice(0, 2)
              : section.data
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            section.data.length > 2 ? (
              <TouchableOpacity
                onPress={() => {
                  listRef?.current?.scrollToIndex({
                    index: categories.indexOf(section.category),
                    viewPosition: 0.5,
                  });

                  setCategoryIndex({
                    index: categories.indexOf(section.category),
                    category: categories[categories.indexOf(section.category)],
                  });
                  [
                    ...getShopList(
                      categories[categories.indexOf(section.category)]
                    ),
                  ];
                }}
              >
                {section.category != "Новинки" ? (
                  <View style={styles.listFooterComponent}>
                    <Text>Сомтреть еще {section.data.length - 2}</Text>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onNavigation()}>
              <CardItem
                id={item.id}
                image={item.image}
                name={item.name}
                category={section.category}
                categoryIndex={categoryIndex.index}
                discount={item.discount}
                favourite={item.favourite}
                toggleFavourite={ToggleFavourite}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={section.data}
          renderItem={({ item }) => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={() => onNavigation()}>
                <CardItem
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  category={section.category}
                  discount={item.discount}
                  description={item.description}
                  favourite={item.favourite}
                  toggleFavourite={ToggleFavourite}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          style={styles.categoryFlatList}
          horizontal
          ref={listRef}
          initialScrollIndex={categoryIndex.index}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderItem}
        />
      </View>

      <SectionList
        style={styles.sectionList}
        sections={shopList}
        renderSectionHeader={renderSectionHeader}
        renderItem={({}) => {
          return null;
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListWrapper: {
    flexGrow: 1,
    marginTop: 20,
  },
  categoryFlatList: {
    marginTop: 50,
  },
  activeCategoryName: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16,
    color: "#fff",
  },
  noActiveCategoryName: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 16,
  },
  categoryWrapper: {
    flexDirection: "row",
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 15,
    justifyContent: "space-between",
  },
  noActiveCategory: {
    height: 40,
    width: 133,
    borderRadius: 10,
    backgroundColor: "#F0F0F5",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  activeCategory: {
    height: 40,
    width: 133,
    borderRadius: 10,
    backgroundColor: "#2F50F4",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  activeCategoryWithIcon: {
    flexDirection: "row",
  },
  noActiveCategoryWithIcon: {
    flexDirection: "row",
  },
  categoryIcon: {
    marginRight: 5,
  },
  sectionList: {
    margin: 0,

    height: "100%",
  },
  listFooterComponent: {
    height: 200,
    width: 330,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionCategory: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
  },
  shopFlatList: {
    height: "auto",
  },
});

export default HomeScreen;
