<template>
<body>
  
  <div class="container">

    <div class="signup-form-container">
    
      <form role="form" id="register-form" autocomplete="off">
         
      <div class="form-header">
        <h3 class="title" style="color:MediumSeaGreen"><i class="fa fa-user"></i> Registrar Parqueadero</h3>
                      
        <div class="pull-right">
          <h3 class="title"><span class="glyphicon glyphicon-pencil"></span></h3>
        </div>
                      
      </div>
         
      <div class="form-body">
        <div class="row">               
          <div class="form-group col-lg-6">
            <label for="name">Nombre</label>
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
                <input name="name" type="text" class="form-control" placeholder="Nombre">
            </div>
              <span class="help-block" id="error"></span>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-lg-6">
            <label for="ubication">Ubicacion</label>
            <div class="input-group">
              <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
              <input name="ubication" type="text" class="form-control" placeholder="Ubicacion">
            </div> 
                <span class="help-block" id="error"></span>                     
          </div>
        </div>

      <label for="schedule_open">Horario</label>
      <div class="row">                
        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="schedule_open" id="schedule_open" type="time" class="form-control" placeholder="Abrir">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="schedule_close" id="schedule_close" type="time" class="form-control" placeholder="Cerrar">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

      </div>      

      <label for="cost">Costo</label>
      <div class="row">
        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="cost" id="cost" type="number" class="form-control" placeholder="Vehiculo">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="cost_m" id="cost_m" type="number" class="form-control" placeholder="Moto">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="cost_b" id="cost_b" type="number" class="form-control" placeholder="Bicicleta">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>
      </div>    

      <label for="slots">Cupos</label>
      <div class="row">
        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="slots" id="slots" type="number" class="form-control" placeholder="Total">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>
      


        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="slot_v" id="slot_v" type="number" class="form-control" placeholder="Vehiculos">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="slot_m" id="slot_m" type="number" class="form-control" placeholder="Motos">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>

        <div class="form-group col-lg-2">
          <div class="input-group">
            <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
            <input name="slot_b" id="slot_b" type="number" class="form-control" placeholder="Bicicletas">
          </div>  
          <span class="help-block" id="error"></span>                    
        </div>
      </div>   

      </div>
            
      <div class="form-footer">
        <button type="submit" class="btn btn-success">
        <span class="glyphicon glyphicon-log-in"></span> Registrar
        </button>
      </div>

      </form>
            
    </div>

  </div>

</body>

</template>

<script>
export default {
  name: 'Registrar',
  props: {
    msg: String
  }
}
</script>
