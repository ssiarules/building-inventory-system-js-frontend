// Purpose of this file will be to talk to our backend API

class BuildingsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/buildings'
    }

    // make a fetch request to baseUrl then when we get that response we will parse the json
    getBuildings() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createBuilding(value) {
        const building = {
            name: value
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ building })
        }).then(res => res.json())
    }

    updateBuilding(value, id) {
        const building = {
            name: value
        }
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ building })
        }).then(res => res.json())
    }
    getBuildingProducts(building_id) {
        // return fetch(`http://localhost:3000/api/v1/buildings/${building_id}/products`).then(res => res.json())
        return fetch(`${this.baseUrl}/${building_id}/products`).then(res => res.json())
    }

}