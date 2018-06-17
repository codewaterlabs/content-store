import { gql } from 'apollo-boost';

const POST_LIST = gql`
    {
        posts {
            id,
            title
        }
    }
`;

const POST = gql`
    query post($id: ID!) {
        post(id: $id) {
            id,
            title,
            text
        }
    }
`;

const DELETE_POST = gql`
    mutation($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

export { POST_LIST, DELETE_POST, POST };