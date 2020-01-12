// Purpose of this file will be to talk to our backend API

class BuildingsAdapter {
    constructor() {
        this.baseUrl =
            'http://localhost:300/api/v1/buildings'
    }

    // make a fetch request to baseUrl then when we get that response we will parse the json
    getBuildings() {
        return fetch(this.baseUrl).then(res => res.json())
    }
}