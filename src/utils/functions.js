export const getTotalPrice = (order) => {
  if (order.length <= 0) {
    return undefined;
  }

  return order
    .map((item) => {
      return item.amount * Number(item.price);
    })
    .reduce((prev, cur) => prev + cur)
    .toFixed(2);
};

export const deliveryPrice = (price) => {
  price = Number(price);

  if (price > 30) {
    return 0;
  }
  if (price > 20) {
    return 1;
  }
  if (price > 10) {
    return 2;
  }

  return 3;
};

export const availableSizes = ["Small", "Medium", "Large"];

export const saveToSessionStorage = (itemName, item) => {
  sessionStorage.setItem(itemName, JSON.stringify(item));
};

export const getFromSessionStorage = (itemName) => {
  return JSON.parse(sessionStorage.getItem(itemName));
};
