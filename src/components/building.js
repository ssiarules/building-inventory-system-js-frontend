class Building {
    constructor(buildingJSON) {
        this.id = buildingJSON.id
        this.name = buildingJSON.name
    }

    renderLi() {
        return `<li>${this.name}</li>`
    }
}