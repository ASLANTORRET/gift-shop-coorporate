import { gql } from 'react-apollo'

export const ASTRUM_PRODUCTS_QUERY = gql`
query astrumProducts($search: String!) {
  astrumProducts(search: $search) {
    _id
    id
    astrum_id
    code
    name_rus
    price
    description_rus
    pictures
  }
}
`
