class ProductsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/products'
    }

    // make a fetch request to baseUrl then when we get that response we will parse the json
    getProducts() {
        return fetch(this.baseUrl).then(res => res.json())
    }

    createProduct(value) {
        const product = {
            name: value,
            category: value,
            description: value
        }

        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ product })
        }).then(res => res.json())
    }

    updateProduct(value, id) {
        const product = {
            name: value,
            category: value,
            description: value
        }
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ product })
        }).then(res => res.json())
    }

}

/*

    getBuildingProducts(building_id) {
        return fetch(`http://localhost:3000/api/v1/buildings/${building_id}/products`)
        .then(function(response) {
             return response.json()
        })
        .then(function(data){
            data.map(product =>{
                const newProduct = new Product(product)
                const NewProductHtml = newProduct.buildingHTML()
                document.getElementById('li').innerHTML = newproductHtml
            })
            console.log(data)
        }
    } 

    Building.prototype.buildingHTML = function () {
        let buildingProducts = this.products.map(product => {
            return (`
                    <p>${product.name}</p>
                    <p>${product.category}</p>
                    <p>${product.description}</p>
                    `)
            }).join('')

            return (`
                   
                     <p>${buildingProduct}</p>
           
            `)
            }
        }
*/

// if(e.target.tagname === "LI")
// get building_id e.target.dataset.id
//  })
// }

// In productadapter 
// getsAllBuildingsProducts(){
// fetch buildings/id/products
// }

// render ()