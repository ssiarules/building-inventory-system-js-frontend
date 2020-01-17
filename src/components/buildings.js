class Buildings {
    constructor() {
        this.buildings = []
        this.products = []
        this.adapter = new BuildingsAdapter()
        this.bindingsAndEventListeners()
        this.fetchAndLoadBuildings()
            // this.fetchAndLoadProducts()
    }

    bindingsAndEventListeners() {
        this.buildingsContainer = document.getElementById('buildings-container')
        this.productsContainer = document.getElementById('products-container')
        this.body = document.querySelector('body')
        this.div = document.querySelector('div#buildings-content')
        this.newBuildingName = document.getElementById('new-building-name')
        this.buildingForm = document.getElementById('new-building-form')
        this.buildingForm.addEventListener('submit', this.createBuilding.bind(this)) // binding this to Buildings when we execute createBuilding otherwise this inside createBuilding will be the form and not the Buildings class  
        this.buildingsContainer.addEventListener('click', this.handleBuildingClick.bind(this))
        this.div.addEventListener('blur', this.updateBuilding.bind(this), true)
        this.buildingsContainer.addEventListener('dblclick', this.handleBuildingProductsClick.bind(this))
            // this.div.addEventListener('dblclick', this.getBuildingProducts.bind(this))
    }

    createBuilding(e) {
        // console.log(this) if we don't add the bind this will be referencing the form
        e.preventDefault()
        console.log('Building is being created')
        const value = this.newBuildingName.value

        this.adapter.createBuilding(value).then(building => {
            this.buildings.push(new Building(building)) // pushing to the building array and creating a new instance of that building, so we are adding the building object to the array that already has the exiting buildings from the server.  
            this.render() // rerender our page to add the new building on to the exiting list of buildings
            this.newBuildingName.value = ' ' // clear out particular input 
            console.log(building)
        })
    }

    handleBuildingClick(e) {
        this.toggleBuilding(e)
    }

    toggleBuilding(e) {
        console.log('double clicked')
        console.log(e.target)
        const li = e.target
        li.focus()
        li.contentEditable = true // when set to true allows user to edit the content on the DOM
        li.classList.add('editable') // when double clicked will add padding to the content you are editing. 
    }

    updateBuilding(e) {
        // debugger
        console.log('update building')
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateBuilding(newValue, id)

        console.log(li.innerHTML, id)
    }

    handleBuildingProductsClick(e) {

        // this.toggleBuildingProducts(e)
        console.log('building products')
        console.log(e.target)
        if (e.target.tagName === 'LI') {
            const buildingID = e.target.dataset.id
            this.adapter.getBuildingProducts(buildingID)
                .then(obj => {
                    // debugger
                    this.products = obj.map(productObj => new Product(productObj))
                    this.renderProducts()
                })
        }
    }

    // toggleBuildingProducts(e) {
    //     console.log('Building-products')
    //     if (e.target.tagName === 'LI') {
    //         const buildingID = e.target.dataset.id
    //         this.adapter.getBuildingProducts(buildingID)
    //             .then(obj => {
    //                 this.products = obj.map(productObj => new Product(productObj))
    //                 this.renderProducts()
    //             })
    //     }
    // }

    // getBuildingProducts(e) {
    //     if (e.target.tagName === 'LI') {
    //         const li = e.target
    //         const id = li.dataset.id
    //         this.fetchAndLoadProducts(id)
    //             // li.innerHTML = this.products
    //         li.append(this.products)
    //         console.log(' Building Products')
    //             // debugger
    //     }
    // }

    // fetchAndLoadProducts(building_id) {
    //     // debugger
    //     this.adapter
    //         .getBuildingProducts(building_id)
    //         .then(products => {
    //             // iterate over each building & push each object into this buildings
    //             this.products.forEach(product => this.products.push(new Product(product)))
    //         })
    //         .then(() => {
    //             this.render()
    //         })
    // }

    fetchAndLoadBuildings() {
        this.adapter
            .getBuildings()
            .then(buildings => {
                // iterate over each building & push each object into this buildings
                buildings.forEach(building => this.buildings.push(new Building(building)))
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        this.buildingsContainer.innerHTML = this.buildings.map(building => building.renderLi()).join('')
    }

    renderProducts() {
        this.productsContainer.innerHTML = this.products.map(product => product.renderLi()).join('')
    }

    // innerHTML
}