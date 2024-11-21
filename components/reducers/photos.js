const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export const photoActionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: (error) => ({ type: types.FAILURE, error: error }),
  success: (photos) => ({
    type: types.SUCCESS,
    payload: { photos },
  }),
};

export const photoInitialState = {
  loading: false,
  error: false,
  photos: [],
};

export function photoReducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        photos: [...action.payload.photos],
      };
    case types.FAILURE:
      return { ...state, loading: false, error: action.error };
  }
}
