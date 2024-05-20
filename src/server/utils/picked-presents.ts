export const getPickedPresents = () => {
  if (typeof window == "undefined") {
    throw new Error("getPickedPresents is not available in the server");
  }
  const localPresents = localStorage.getItem("presents");
  const parsedPresents = JSON.parse(localPresents || "[]");

  return parsedPresents;
};

export const setPickedPresents = (presents: string[]) => {
  if (typeof window == "undefined") {
    throw new Error("setPickedPresents is not available in the server");
  }
  localStorage.setItem("presents", JSON.stringify(presents));
};

export const removePickedPresent = (id: string) => {
  if (typeof window == "undefined") {
    throw new Error("removePickedPresent is not available in the server");
  }
  const localPresents = getPickedPresents();
  const newPresents = localPresents.filter((present: string) => present !== id);
  setPickedPresents(newPresents);
};