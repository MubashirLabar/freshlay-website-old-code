import {
  FILTERD_PRODUCT_LIST_REQUEST,
  FILTERD_PRODUCT_LIST_SUCCESS,
  FILTERD_PRODUCT_LIST_SUCCESS_MORE,
  FILTERD_PRODUCT_LIST_FAIL,
  FILTERD_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  HOMEPAGE_PACKAGE_LIST_REQUEST,
  HOMEPAGE_PACKAGE_LIST_SUCCESS,
  HOMEPAGE_PRODUCT_LIST_REQUEST,
  HOMEPAGE_PRODUCT_LIST_SUCCESS,
  HOMEPAGE_PRODUCT_LIST_FAIL,
  HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE,
  HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  SEARCH_PRODUCT_LIST_REQUEST,
  SEARCH_PRODUCT_LIST_SUCCESS,
  SEARCH_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  SEARCH_PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  SELECT_CATEGORY_PRODUCT_REQUEST,
  SELECT_CATEGORY_PRODUCT_SUCCESS,
  LIVE_PRODUCT_REQUESTS_LIST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  SEARCH_PRODUCT_LIST_SUCCESS_MORE,
  PRODUCT_REQUESTS_LIST_REQUEST,
  PRODUCT_REQUESTS_LIST_SUCCESS,
} from "../actions/types";

export const homepageproductListReducer = (
  state = {
    moreloading: false,
    products: [],
    totalproducts: null,
    packageloaded: false,
    packages: [],
  },
  action
) => {
  switch (action.type) {
    case HOMEPAGE_PACKAGE_LIST_REQUEST:
      return {
        ...state,
        packageloaded: false,
      };
    case HOMEPAGE_PACKAGE_LIST_SUCCESS:
      return {
        ...state,
        packageloaded: true,
        packages: action.payload,
      };
    case HOMEPAGE_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOMEPAGE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        totalproducts: action.payload.totalproduct,
      };
    case HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE_REQUEST: {
      return {
        ...state,
        moreloading: true,
      };
    }
    case HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE:
      return {
        ...state,
        moreloading: false,
        products: [...state.products, ...action.payload.updatedproducts],
      };
    case HOMEPAGE_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const filterdproducts = (
  state = { filtermoreloading: false, products: [], totalproducts: null },
  action
) => {
  switch (action.type) {
    case FILTERD_PRODUCT_LIST_SUCCESS_MORE_REQUEST:
      return {
        ...state,
        filtermoreloading: true,
      };

    case FILTERD_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        //  ...state
        // products: []
      };
    case FILTERD_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,

        products: action.payload.products,
        totalproducts: action.payload.totalproducts,
      };
    case FILTERD_PRODUCT_LIST_SUCCESS_MORE:
      return {
        ...state,
        filtermoreloading: false,
        loading: false,

        products: [...state.products, ...action.payload.updatedproducts],
        totalproducts: action.payload.totalproducts,
      };
    case FILTERD_PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchproducts = (
  state = {
    searchmoreloading: false,
    products: [],
    totalproducts: null,
    currentkeyword: null,
    skip: 0,
  },
  action
) => {
  switch (action.type) {
    case SEARCH_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        currentkeyword: action.payload,
        skip: 0,
        //  ...state
        // products: []
      };
    case SEARCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,

        products: action.payload.products,
        totalproducts: action.payload.totalproducts,
      };
    case SEARCH_PRODUCT_LIST_SUCCESS_MORE_REQUEST:
      return {
        ...state,
        searchmoreloading: true,
      };
    case SEARCH_PRODUCT_LIST_SUCCESS_MORE:
      return {
        ...state,
        searchmoreloading: false,
        loading: false,
        products: [...state.products, ...action.payload.products],
        skip: action.payload2.skip,
      };
    case SEARCH_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ADMIN REDUCERS

export const AdminProductList = (
  state = { products: [], selectproduct: [], requestproducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_REQUESTS_LIST_REQUEST:
      return { ...state, request_prod_loaded: false };
    case PRODUCT_REQUESTS_LIST_SUCCESS:
      return {
        ...state,
        request_prod_loaded: true,
        requestproducts: action.payload,
      };
    case SELECT_CATEGORY_PRODUCT_REQUEST:
      return { ...state, catprod_loaded: false };
    case SELECT_CATEGORY_PRODUCT_SUCCESS:
      return {
        ...state,
        catprod_loaded: true,
        selectproduct: action.payloadproduct,
      };
    case PRODUCT_LIST_REQUEST:
      return { ...state, loaded: false };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loaded: true, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { ...state, loaded: true, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
