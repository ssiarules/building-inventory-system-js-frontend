class Product {
    constructor(ProductJSON) {
        this.id = productJSON.id
        this.name = productJSON.name
        this.category = productJSON.category
        this.description = productJSON.description
        this.building_id = productJSON.building_id
    }

    renderLi() {
        return `<li data-id=${this.building_id}>${this.name},${this.category},${this.description}</li>`
    }
}