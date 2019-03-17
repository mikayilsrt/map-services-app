const $map = document.getElementById('map')

class GoogleMap {

    constructor () {
        this.map = null
    }

    loadMap (element) {
        $script('https://maps.googleapis.com/maps/api/js', () => {
            this.map = new google.maps.Map(element, {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        })
    }

}

if ($map !== null) {
    let map = new GoogleMap()
    map.loadMap($map)
}