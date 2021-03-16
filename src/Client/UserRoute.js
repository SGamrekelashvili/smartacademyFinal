import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
    }
  }
`;

const REGISTRATION_USER = gql`
  mutation register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
    }
  }
`;

export { LOGIN_USER, REGISTRATION_USER };
