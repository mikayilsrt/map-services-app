const $map = document.getElementById('map')

class GoogleMap {

    /**
     * Constructor of GoogleMap.
     */
    constructor () {
        this.map = null
        this.bounds = null
    }

    /**
     * Load the google map in element.
     * @param { HTMLElement } element 
     */
    async loadMap (element) {
        return new Promise((resolve, reject) => {
            $script('https://maps.googleapis.com/maps/api/js', () => {
                this.map = new google.maps.Map(element)
                this.bounds = new google.maps.LatLngBounds()
                resolve()
            })
        })
    }

    /**
     * Add a new marker in map.
     * @param { string } lat 
     * @param { string } lng 
     * @param { string } name 
     */
    addMarker (lat, lng, name) {
        let LatLng = new google.maps.LatLng(lat, lng)

        let marker = new google.maps.Marker({
            position: LatLng,
            map: this.map,
            title: name
        })
        this.bounds.extend(LatLng)
    }

    /**
     * Center the map.
     */
    centerMap () {
        this.map.panToBounds(this.bounds)
        this.map.fitBounds(this.bounds)
    }

}

if ($map !== null) {
    let map = new GoogleMap()
    map.loadMap($map).then(() => {
        Array.from(document.querySelectorAll('.js-item')).forEach((item) => {
        
            let lat = item.dataset.lat
            let lng = item.dataset.lng
            let name = item.dataset.name
            
            map.addMarker(lat, lng, name)
        })
        map.centerMap()
    })
}