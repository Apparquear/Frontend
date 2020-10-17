<template>
    <div>
        <h1>Encuentra tu parqueadero</h1>
        <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
    </div>    
</template>

<script>
export default {
    data (){
        return {
            coordinates: {
                lat: 0,
                lng: 0
            }
        }
    },
    created() {
        // Tomar las coordenadas de los usuarios desde el request del browser
        this.$getLocation({})
            .then(coordinates => {
                this.coordinates = coordinates;
            })
    }
}
</script>