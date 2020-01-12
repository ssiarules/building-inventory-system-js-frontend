class Buildings {
    constructor() {
        this.buildings = []
        this.adapter = new BuildingsAdapter()
            // this.bindEventListeners()
        this.fetchAndLoadBuildings()
    }

    fetchAndLoadBuildings() {
        this.adapter.getBuildings().then(buildings => {
                console.log(buildings)
            })
            .then(() => {
                // iterate over each building & push each object into this buildings
                this.buildings.forEach(building => this.buildings.push(building))
            })
    }

    render() {
        console.log('rendering is working ')
        const buildingsContainer = document.getElementById('buildings-container')
        buildingsContainer.innerHTML = 'My Buildings goes here'
    }
}