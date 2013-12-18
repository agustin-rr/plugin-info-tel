
// El API de cordova nos ofrece:
//   � exports es lo que queremos exportar fuera
cordova.define("com.agustinrr.phonegap.InfoTelefono", function(require, exports, module)
{

	// Todo variables locales
	
	/** ... */
	var InfoTelefono= function(numero, imei, imsi) {
		this.numero= numero;
		this.imei= imei;
		this.imsi= imsi;
	}
	
	/** ... */
	InfoTelefono.prototype.numero= null;
	InfoTelefono.prototype.imei= null;
	InfoTelefono.prototype.imsi= null;
	
	// Si lo necesitamos podemos a�adir m�todos aqu�
	
	
	// Si alguien pide el m�dulo le devolver� nuestro objeto
	module.exports= InfoTelefono;

});