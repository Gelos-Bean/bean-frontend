class Product {
    constructor(name, price, course, options=[], image='') {
        this.name = name,
        this.price = price
        this.course = course,
        this.options = options,
        this.image = image
    }
}

export default Product;