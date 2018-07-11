const Type = `
  type AstrumCategory {
    _id: String
    astrum_id: Int
    name: String
    parent: AstrumCategory
    children: [AstrumCategory]
    products (offset: Int, limit: Int): [AstrumProduct]
    productCount: Int
  }
`
export default Type
