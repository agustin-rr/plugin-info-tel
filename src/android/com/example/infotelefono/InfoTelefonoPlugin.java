package com.example.infotelefono;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.telephony.TelephonyManager;

public class InfoTelefonoPlugin extends CordovaPlugin 
{
	
	public static final String OBTENER_INFO_ACCION= "OBTENER_INFO_ACCION";
	
	
	private JSONObject obtenerInfoTelefonoImpl()
	  throws JSONException
	{
		TelephonyManager manager= (TelephonyManager)
		    super.cordova.getActivity()
		                 .getSystemService(Context.TELEPHONY_SERVICE);
		
		String numero= manager.getLine1Number();
		String imei= manager.getDeviceId();
		String imsi= manager.getSubscriberId(); // Nº único a nivel mundial de mi teléfono
		
		// Hay que devolverlo como un objeto JSON
		// Usamos replace porque format de JSON no funciona muy bien con "
		String jsonString=
				"{ " +
				  "'numero' : '{0}', " +
				  "'imei' : '{1}', " +
				  "'imsi' : '{2}' " +
				"}";
		
		jsonString= jsonString.replaceAll("'", "\"")
				.replace("{0}", numero == null ? "" : numero)
				.replace("{1}", imei == null ? "" : imei)
				.replace("{2}", imsi == null ? "" : imsi);

		return new JSONObject(jsonString);
	}
	
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext ctx)
	throws JSONException
	{
		boolean resultado= false;
		
		try
		{
			// Para cada función que pueda ejecutar el plugin
			if(OBTENER_INFO_ACCION.equals(action)) {
				
				// Si recibiéramos argumentos. Comprobaríamos si es del tipo esperado y luego
				// long param= args.getLong(0);
				// ...
				
				
				// Obtenemos los datos del teléfono. Estarán en JSON para
				// que lo entienda JS
				JSONObject jsonSuccess= this.obtenerInfoTelefonoImpl();
				
				// ctx.success(jsonSuccess) es una abreviación de esto
				ctx.sendPluginResult(
						new PluginResult(PluginResult.Status.OK, jsonSuccess)
				);
				
			} else {
				throw new IllegalArgumentException(action + " no soportada.");
			}
			
/*				
			} else if () {
				
			} else {
				
			}
*/
			
			resultado= true;
		}
		// Capturamos excepciones y errores
		catch (Throwable exc) {
			JSONObject jsonError= new JSONObject(
					"{ \"mensaje\" : \"" + exc.getMessage() + "\""
			);
			
			ctx.sendPluginResult(
					new PluginResult(PluginResult.Status.ERROR, jsonError)
			);
		}
		
		return resultado;
	}

}
