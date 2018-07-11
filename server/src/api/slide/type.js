const Type = `
  type Slide {
    _id: String
    caption: String
    imageUrl: String
    linkUrl: String
    title: String
  }

  input SlideInput{
    _id: String
    caption: String
    imageUrl: String
    linkUrl: String
    title: String
  }

  type SlidePayload {
    _id: String
    result: Boolean
  }
`
export default Type
