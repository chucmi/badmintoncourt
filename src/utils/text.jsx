export function ArrayToString(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array of objects");
  }

  const telephones = array.map((item) => item.telephone);
  return telephones.join(" - ");
}

export function getMinMaxPrice(slots) {
  if (!Array.isArray(slots)) {
    throw new TypeError("Expected an array of slot objects");
  }

  if (slots.length === 0) {
    return "";
  }

  const prices = slots
    .filter((slot) => slot && typeof slot.price === "number")
    .map((slot) => slot.price);

  if (prices.length === 0) {
    return "";
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `${minPrice.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}`;
  }

  return `${minPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })} - ${maxPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })}`;
}
