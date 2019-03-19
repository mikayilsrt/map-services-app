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

    /**
     * Center the map on marker after click.
     * @param { JSON } latLng 
     */
    centerOnMarker (latLng) {
        new google.maps.Map($map, {
            zoom: 4,
            center: latLng
        })
    }

}

if ($map !== null) {
    let map = new GoogleMap()
    map.loadMap($map).then(() => {

        let items = document.querySelectorAll('.js-item')

        Array.from(items).forEach((item) => {
        
            let lat = item.dataset.lat
            let lng = item.dataset.lng
            let name = item.dataset.name
            
            map.addMarker(lat, lng, name)
            
            // zoom on marker after click a item.
            item.addEventListener('click', (e) => {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].classList[2] === 'active') {
                        items[i].classList.remove('active')
                    }
                }
                item.classList.add('active')
                map.centerOnMarker({ lat: parseInt(item.dataset.lat), lng: parseInt(item.dataset.lng) })
            })
        })
        map.centerMap()
    })
}