
cordova.define("com.agustinrr.phonegap.infotelefonoplugin", function(require, exports, module)
{
	var exec= require('cordova/exec');
	
	var InfoTelefono= require('./InfoTelefono');
//	var contactsPlugin= require('org.apache.xxx.contacts');
	
	var InfoTelefonoPlugin= function() {
		
	}
	
	/**
	 * 
	 * Uso: window.telefono.obtenerInfo(<callback �xito>,...);
	 * 
	 * @returns InfoTelefono
	 */
	InfoTelefonoPlugin.prototype.obtenerInfo= function(success, fail)
	{
		// El tercer par�metro lo emplearemos en la configuraci�n
//		exec(success, fail, 'InfoTelefonoPlugin', []);
		
		// Otra opci�n diferente a la anterior es usar una funci�n intermedia para
		// devolver nuestro objeto de dominio. Esto hace nuestro c�digo m�s f�cil de
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
	
	// Ejecutar� la operaci�n
	module.exports= new InfoTelefonoPlugin();
	
});