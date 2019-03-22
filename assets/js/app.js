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
            label: name
        })
        this.bounds.extend(LatLng)

        marker.addListener('click', (e) => {
            // select all items.
            let elements = document.querySelectorAll('.js-item')

            for (var i = 0; i < elements.length; i++) {
                let element = elements[i]
                // remove active class.
                if (element.classList[2] === 'active') {
                    element.classList.remove('active')
                }
                // add active class.
                if (element.dataset.name === marker.label) {
                    element.classList.add('active')
                }
            }
            // zoom the marker after click.
            this.zoomMarker(marker)
        })
    }

    /**
     * Center the map.
     */
    centerMap () {
        this.map.panToBounds(this.bounds)
        this.map.fitBounds(this.bounds)
    }

    /**
     * Zoom the map on marker.
     * 
     * @param { Marker } marker 
     */
    zoomMarker (marker) {
        this.map.setCenter(marker.position)
        this.map.setZoom(4)
    }

    /**
     * Center the map on marker after click.
     * @param { JSON } latLng 
     */
    centerOnMarker (latLng) {
        this.map.setCenter(latLng)
        this.map.setZoom(4)
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