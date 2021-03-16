import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = localStorage.getItem("accessSmartToken");
const client = new ApolloClient({
  uri: "https://smartacademy-back.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  credentials: "same-origin",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "true",
  "Content-Type": "application/json",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "true",
    "Content-Type": "application/json",
  },
});

export default client;
