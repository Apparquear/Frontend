<template>
    <div class="Mapgoogle">
        <h1>Encuentra tu parqueadero</h1>
        <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
        <GmapMap
            :center="coordinates"
            :zoom="14"            
            map-type-id="terrain"
            style="width: 700px; height: 500px; margin: 32px auto;"
        >
        <GmapMarker
            v-bind:key="index"
            v-for="(m, index) in markers"
            v-bind:position="m.position"        
            v-bind:clickable="true"
            :draggable="true"            
        />
        <GmapMarker
            v-bind:key="index"
            v-for="(m, index) in markers"
            v-bind:position="coordinates"        
            v-bind:clickable="true"
            :draggable="true"            
        />
        </GmapMap>
            
    </div>
   
</template>

<script>
export default {
    data (){
        return {
            coordinates: {
                lat: 0,
                lng: 0
            },
             markers: [{
                position: {lat:0.0 , lng: 0.0 }
        }], //marker de la nacho
             markers: [{
                position: {lat:4.638261 , lng: -74.084056 }
        }]
        }
    },
    created() {
        // Tomar las coordenadas de los usuarios desde el request del browser
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
            .catch(error => alert(error));
    }
}
</script>