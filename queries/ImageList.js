import { gql } from 'apollo-boost';

const IMAGE_LIST = gql`
    {
        images {
            id,
            filename
        }
    }
`;

const DELETE_IMAGE = gql`
    mutation($id: ID!) {
        deleteImage(id: $id) {
            id
        }
    }
`;

export { IMAGE_LIST, DELETE_IMAGE };