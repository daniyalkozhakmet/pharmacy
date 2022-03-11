import { Container } from "react-bootstrap";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import HomeScreen from "./components/screens/HomeScreen.js";
import ProductDetailScreen from "./components/screens/ProductDetailScreen.js";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import CartScreen from "./components/screens/CartScreen.js";
import LoginScreen from "./components/screens/LoginScreen.js";
import RegisterScreen from "./components/screens/RegisterScreen.js";
import ProfileScreen from "./components/screens/ProfileScreen.js";
import ShippingScreen from "./components/screens/ShippingScreen.js";
import PaymentMethodScreen from "./components/screens/PaymentMethodScreen.js";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen.js";
import OrderScreen from "./components/screens/OrderScreen.js";
import AdminUsers from "./components/screens/AdminUsers.js";
import AdminProductsScreen from "./components/screens/AdminProductsScreen.js";
import AdminEditUser from "./components/screens/AdminEditUser.js";
import AdminCreateScreen from "./components/screens/AdminCreateScreen.js";
import AdminCategoryBrandScreen from "./components/screens/AdminCategoryBrandScreen.js";
import AdminOrders from "./components/screens/AdminOrders.js";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container>
          <main>
            <Route path="/admin" exact component={AdminUsers} />
            <Route
              path="/admin/products"
              exact
              component={AdminProductsScreen}
            />
            <Route path="/admin/orders" exact component={AdminOrders} />
            <Route
              path="/admin/category"
              exact
              component={AdminCategoryBrandScreen}
            />
            <Route
              path="/admin/products/create/:id?"
              exact
              component={AdminCreateScreen}
            />
            <Route path="/admin/user/:id" exact component={AdminEditUser} />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route path="/payment" exact component={PaymentMethodScreen} />
            <Route path="/placeorder" exact component={PlaceOrderScreen} />
            <Route path="/order/:id" exact component={OrderScreen} />
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/product/:id" exact component={ProductDetailScreen} />
            <Route path="/cart/:id?" exact component={CartScreen} />
          </main>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
