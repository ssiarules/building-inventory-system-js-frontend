class Building {
    constructor(buildingJSON) {
        this.id = buildingJSON.id
        this.name = buildingJSON.name
    }

    renderLi() {
        return `<li data-id=${this.id}>${this.name}</li>`
    }
}