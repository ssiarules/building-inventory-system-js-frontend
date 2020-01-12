class Buildings {
    constructor() {
        this.buildings = []
        this.adapter = new BuildingsAdapter()
            // this.bindEventListeners()
        this.fetchAndLoadBuildings()
    }

    fetchAndLoadBuildings() {
        this.adapter
            .getBuildings()
            .then(buildings => {
                // iterate over each building & push each object into this buildings
                buildings.forEach(building => this.buildings.push(new Building(building)))
                console.log(buildings)
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        const buildingArray = this.buildings.map(building => `<li>${building.name}</li>`).join('')
        console.log(buildingsArray)
        console.log('rendering is working ')
        const buildingsContainer = document.getElementById('buildings-container')
        buildingsContainer.innerHTML = this.buildings.map(building => `<li>${building.name}</li>`).join('')
    }
}