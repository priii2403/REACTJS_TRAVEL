import { createContext, useState } from "react";
const FavouriteContext = createContext({
  favoutite: [],
  totalFavourite: 0,
  addFavourite: (m) => {},
  removeFavourite: (r) => {},
  itemIsFavourite: (i) => {},
});
export function FavContextProvider(props) {
  const [userFav, setuserFav] = useState([]);
  const context = {
    favoutite: userFav,
    totalFavourite: userFav.length,
    addFavourite: addFavHandler,
    removeFavourite: removeFavHandler,
    itemIsFavourite: itemIsFavHandler,
  };
  function addFavHandler(favouriteMeetup) {
    setuserFav((pre) => {
      return pre.concat(favouriteMeetup);
    });
  }
  function removeFavHandler(removeMeetup_ID) {
    setuserFav((pre) => {
      return pre.filter((meetup) => meetup.id !== removeMeetup_ID);
    });
  }
  function itemIsFavHandler(meetupId) {
    return userFav.some((meetup) => meetup.id === meetupId);
  }
  return (
    <FavouriteContext.Provider value={context}>
      {props.children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContext;
