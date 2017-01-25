/**
 * Processa logs to show
 * @return {Object} Properties
 */
function getProps() {
	Logger.log("Realiza leitura de propriedades");
	var docProperties = PropertiesService.getDocumentProperties();
	var result = [];
	var props = docProperties.getProperties();
	for (var step in props) {
		result.push({
			key: step,
			value: props[step]
		});
	}
	result.sort(compare_);
	return result;
}

/**
 * Set start prop, deleting all properties before
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
function setStartProps_(key, value) {
	var docProperties = PropertiesService.getDocumentProperties();
	docProperties.deleteAllProperties();
	setProp_(key, value);
	docProperties.setProperty("errCount", 0);
}

/**
 * Set a log in properties
 * @param {string} key   The key of a property
 * @param {string} value The value of a property
 */
function setProp_(key, value) {
	var docProperties = PropertiesService.getDocumentProperties();
	docProperties.setProperty(key, value);
}

/**
 * Set prop of error with controle
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
function setErrProp_(key, value) {
	var docProperties = PropertiesService.getDocumentProperties();
	var counter = docProperties.getProperty("errCount");
	docProperties.setProperty(key + counter.toString(), value);
	counter = parseInt(counter) + 1;
	docProperties.setProperty("errCount", counter);
}