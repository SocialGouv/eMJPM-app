const filters = (
  state = {
    filters: "",
    mesures: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return {
        filters: action.filters,
          mesures: action.mesures
      };
    default:
      return state;
  }
};

export default filters;
