import { gql } from 'apollo-boost';

const CREATE_USER = gql`
    mutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

const LOGIN = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export { CREATE_USER, LOGIN };