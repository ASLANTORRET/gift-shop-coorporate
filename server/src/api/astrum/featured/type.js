const Type = `
    type FeaturedCategory {
        _id: String
        id: Int
        name_rus:String,
        name_kaz:String,
        name_eng:String,
        products:[AstrumProduct]
    }

    input FeaturedInput{       
        id: Int,
        name_rus:String,
        name_kaz:String,
        name_eng:String,
        products:[Int]
      }

    type FeaturedPayload {
        _id: String
        result: Boolean
    }
`
export default Type