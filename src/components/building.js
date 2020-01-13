class Building {
    constructor(buildingJSON) {
        this.id = buildingJSON.id
        this.name = buildingJSON.name
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}
// add eventlister to bindingandeventlistner method in buildings.js
// if e.target.tagname === "LI"
// get building_id e.target.dataset.id

// getsAllBuildingsProducts(){
// fetch buildings/id/products
// }

// render ()