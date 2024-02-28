import { makeAutoObservable } from "mobx";
import { ImageProps } from "react-native";
import { ShopsData, CategoriesData } from "../data/DataBase";

interface shopProps {
  id: number;
  image: ImageProps;
  name: string;
  discount: string;
  favourite: boolean;
  description: string;
}

interface shopListprops {
  category: string;
  data: shopProps[];
}

class ShopStore {
  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  data = ShopsData;
  categories = CategoriesData;
  favoritesList: shopProps[] = [];
  shopList: shopListprops[] = [];

  init = () => {
    this.shopList = this.groupByCategory();
  };
  addFavoriteList = (id: number) => {
    this.data = this.data.map((item, index) => {
      if (item.id == id && item.favourite == false) {
        item.favourite = true;
        this.favoritesList.push(item);
        return { ...item, favourite: true };
      } else {
        return item;
      }
    });
    this.shopList.find((shopItem) => {
      shopItem.data.find((shopDataItem) => {
        if (shopDataItem.id == id) {
          shopDataItem.favourite = true;
        }
      });
    });
  };

  deleteFavoriteList = (id: number) => {
    this.data = this.data.map((item, index) => {
      if (item.id == id && item.favourite == true) {
        item.favourite = false;
        return { ...item, favourite: false };
      } else {
        return item;
      }
    });
    this.shopList.find((shopItem) => {
      shopItem.data.find((shopDataItem) => {
        if (shopDataItem.id == id) {
          shopDataItem.favourite = false;
        }
      });
    });
    this.favoritesList = this.favoritesList.filter((item) => {
      return item.id !== id;
    });
  };

  groupByCategory = () => {
    let newGroupShopList: any = [];
    let dateTimeNow = new Date();

    newGroupShopList.push({
      category: "Новинки",
      data: [],
    });

    for (let i = 1; i < this.categories.length; i++) {
      newGroupShopList.push({
        category: this.categories[i],
        data: [],
      });
    }

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < newGroupShopList.length; j++) {
        if (newGroupShopList[j].category == this.data[i].category) {
          newGroupShopList[j].data.push({
            id: this.data[i].id,
            image: this.data[i].image,
            name: this.data[i].name,
            discount: this.data[i].discount,
            description: this.data[i].description,
            favourite: this.data[i].favourite,
          });
        }
        if (
          this.data[i].date.getFullYear() - dateTimeNow.getFullYear() == 0 &&
          this.data[i].date.getMonth() - dateTimeNow.getMonth() <= 1 &&
          newGroupShopList[j].category == "Новинки"
        ) {
          newGroupShopList[j].data.push({
            id: this.data[i].id,
            image: this.data[i].image,
            name: this.data[i].name,
            discount: this.data[i].discount,
            description: this.data[i].description,
            favourite: this.data[i].favourite,
          });
        }
      }
    }

    return newGroupShopList;
  };

  getShopList = (category: string) => {
    if (category == "Все скидки") {
      this.shopList = this.groupByCategory();
      return this.shopList;
    } else {
      this.shopList = this.groupByCategory().filter(
        (item: any) => item.category == category
      );

      return this.shopList;
    }
  };
}

export default new ShopStore();
