import { ApolloClient, InMemoryCache } from "@apollo/client";

const token = localStorage.getItem("accessSmartToken");
console.log(token ? `Bearer ${token}` : false);

const client = token
  ? new ApolloClient({
      uri: "https://smartacademy-back.herokuapp.com/graphql",
      cache: new InMemoryCache(),
      mode: "cors",
      headers: {
        Authorization: token ? `Bearer ${token}` : false,
      },
      onError: (e) => {
        console.log(e);
      },
    })
  : new ApolloClient({
      uri: "https://smartacademy-back.herokuapp.com/graphql",
      cache: new InMemoryCache(),
      mode: "cors",
      onError: (e) => {
        console.log(e);
      },
    });

export default client;
