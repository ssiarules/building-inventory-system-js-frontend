class Buildings {
    constructor() {
        this.buildings = []
        this.adapter = new BuildingsAdapter()
        this.BindingsAndEventListeners()
        this.fetchAndLoadBuildings()
    }

    //
    BindingsAndEventListeners() {
        this.buildingsContainer = document.getElementById('buildings-container')
        this.body = document.querySelector('body')
        this.newBuildingName = document.getElementById('new-building-name')
        this.buildingForm = document.getElementById('new-building-form')
        this.buildingForm.addEventListener('submit', this.createBuilding.bind(this)) // binding this to Buildings when we execute createBuilding otherwise this inside createBuilding will be the form and not the Buildings class 
        this.buildingsContainer.addEventListener('dblclick', this.handleBuildingClick.bind(this))
            // this.body.addEventListener('blur', this.updatedBuilding.bind(this), true) // selected a parent to add a listener to blur & true so any children of that body we're going to listen for on blur 
        this.body.addEventListener('blur', this.updatedBuilding, true)
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

    updateBuilding() {
        const li = e.target
        li.contentEditable = false
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        this.adapter.updateBuilding(newValue, id)
        console.log('update building')
        console.log(li.innerHTML, id)
    }

    fetchAndLoadBuildings() {
        this.adapter
            .getBuildings()
            .then(buildings => {
                // iterate over each building & push each object into this buildings
                this.buildings.forEach(building => this.buildings.push(new Building(building)))
                console.log(buildings)
            })
            .then(() => {
                this.render()
            })
    }

    render() {
        // const buildingArray = this.buildings.map(building => `<li>${building.name}</li>`).join('')
        // console.log(buildingsArray)
        console.log('rendering is working ')
        this.buildingsContainer.innerHTML = this.buildings.map(building => building.renderLi()).join('')
        this.buildingsContainer.innerHTML = 'LIST OF BUILDINGS'
    }
}