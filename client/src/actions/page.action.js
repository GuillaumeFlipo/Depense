import page_ from "./../fonction_js/page_info";

export const GET_MEASURES = "GET_MEASURES";
export const GET_SCROLL = "GET_SCROLL";

export const getMeasures = () => {
  return (dispatch) => {
    return dispatch({
      type: GET_MEASURES,
      payload: {
        widthScreen: page_.getXmax(),
        heightScreen: page_.getYmax(),
        scrollPage: page_.getScrollPage(),
      },
    });
  };
};
