const Resolver = {
  AstrumProduct: {
    // async children(root, args, context) {
    //   return Products.find({parentId: root._id})
    // }
    pictures(root, args, context){
      return root.pictures.map(picture => {
        if (picture !== 'images/.jpg')
          return 'http://92.46.43.37/shuttle.dll/Picture?type=1&key='+picture
      })
    }
  }
}

export default Resolver