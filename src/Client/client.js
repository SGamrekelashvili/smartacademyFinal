import { ApolloClient, InMemoryCache } from "@apollo/client";

// const token = localStorage.getItem("accessSmartToken");

const client = new ApolloClient({
  uri: "https://smartacademy-back.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: `no-cors`,
  },
  // credentials: "include",
  headers: {
    // authorization: token ? `Bearer ${token}` : " ",
    "Access-Control-Allow-Origin": "*",
  },
});

export default client;
