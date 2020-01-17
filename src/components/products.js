class Products {
    constructor() {
        this.products = []
        this.adapter = new ProductsAdapter()
        this.bindingsAndEventListeners()
        this.fetchAndLoadProducts()
    }

    bindingsAndEventListeners() {
        this.productsContainer = document.getElementById('products-container')
        this.body = document.querySelector('body')
        this.newProductName = document.getElementById('new-product-name')
        this.productForm = document.getElementById('new-product-form')
        this.productForm.addEventListener('submit', this.createProduct.bind(this)) // binding this to Buildings when we execute createBuilding otherwise this inside createBuilding will be the form and not the Buildings class 
        this.productsContainer.addEventListener('dblclick', this.handleProductClick.bind(this))

        // this.body.addEventListener('blur', this.updatedBuilding.bind(this), true) // selected a parent to add a listener to blur & true so any children of that body we're going to listen for on blur 
        this.body.addEventListener('blur', this.updatedProduct, true)
    }

    createProduct(e) {
        // console.log(this) if we don't add the bind this will be referencing the form
        e.preventDefault()
        console.log('Product is being created')
        const value = this.newProductName.value

        this.adapter.createProduct(value).then(product => {
            this.products.push(new Product(product)) // pushing to the building array and creating a new instance of that building, so we are adding the building object to the array that already has the exiting buildings from the server.  
            this.render() // rerender our page to add the new building on to the exiting list of buildings
            this.newProductName.value = ' ' // clear out particular input 
            console.log(product)
        })
    }

    handleProductClick(e) {
        this.toggleProduct(e)
    }

    toggleProduct(e) {
        console.log('double clicked')
        console.log(e.target)
        const li = e.target
        li.focus()
        li.contentEditable = true // when set to true allows user to edit the content on the DOM
        li.classList.add('editable') // when double clicked will add padding to the content you are editing. 
    }

    updateProduct() {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateProduct(newValue, id)
        console.log('update Product')
        console.log(li.innerHTML, id)
    }

    fetchAndLoadProducts() {
        this.adapter
            .getProducts()
            .then(products => {
                // iterate over each building & push each object into this buildings
                products.forEach(product => this.products.push(new Product(product)))
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        this.productsContainer.innerHTML = this.products.map(product => product.renderLi()).join('')
    }
}