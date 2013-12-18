
cordova.define("com.agustinrr.phonegap.infotelefonoplugin", function(require, exports, module)
{
	var exec= require('cordova/exec');
	
	var InfoTelefono= require('./InfoTelefono');
//	var contactsPlugin= require('org.apache.xxx.contacts');
	
	var InfoTelefonoPlugin= function() {
		
	}
	
	/**
	 * 
	 * Uso: window.telefono.obtenerInfo(<callback éxito>,...);
	 * 
	 * @returns InfoTelefono
	 */
	InfoTelefonoPlugin.prototype.obtenerInfo= function(success, fail)
	{
		// El tercer parámetro lo emplearemos en la configuración
//		exec(success, fail, 'InfoTelefonoPlugin', []);
		
		// Otra opción diferente a la anterior es usar una función intermedia para
		// devolver nuestro objeto de dominio. Esto hace nuestro código más fácil de
		// leer por un "forano". Si vamos a publicar nuestro plugin es bueno hacer esto
		exec(function(jsonJava) {
			
			var resultado= new InfoTelefono();
			resultado.imei= jsonJava.imei;
			resultado.numero= jsonJava.numero;
			resultado.imsi= jsonJava.imsi;
			
			success(resultado);
			
  		  },
		  fail, 'InfoTelefonoPlugin', 'OBTENER_INFO_ACCION', []
		);
		
		
	};
	
	// Ejecutará la operación
	module.exports= new InfoTelefonoPlugin();
	
});