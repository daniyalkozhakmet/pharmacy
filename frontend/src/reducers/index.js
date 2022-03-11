import { combineReducers } from "redux"
import {productsListReducer,productDetailReducer,createProductReducer,updateProductReducer} from './productsListReducer'
import { cartReducer } from "./cartReducer"
import {userReducer,userDetailsReducer,updateUserReducers,getUsersAdminReducer,getUserByIdAdminReducer} from './userReducers'
import { createOrderReducer,getOrderDetailReducer,orderToPayedDetailReducer,getMyOrdersReducer,getOrdersAdminReducer } from "./orderReducer"
import { getCategoryReducer } from "./categoryReducer"
import { getBrandReducer } from "./brandReducer"
export default combineReducers({
    productList:productsListReducer,
    productDetail:productDetailReducer,
    cartItems:cartReducer,
    userInfo:userReducer,
    userDetails:userDetailsReducer,
    updateUser:updateUserReducers,
    createOrder:createOrderReducer,
    getOrderDetail:getOrderDetailReducer,
    orderToPaid:orderToPayedDetailReducer,
    getMyOrders:getMyOrdersReducer,
    getUsersAdmin:getUsersAdminReducer,
    getUserByIdAdmin:getUserByIdAdminReducer,
    createProduct:createProductReducer,
    getCategory:getCategoryReducer,
    getBrand:getBrandReducer,
    updateProduct:updateProductReducer,
    getOrdersAdmin:getOrdersAdminReducer
})