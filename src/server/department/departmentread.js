/**
 * Read information abou the needs of the departments
 * @return {Object[]} array of objects representing the departments
 */
function readDepts_(sheetId) {
	Logger.log("Leitura de departamentos");
	writeLog_(sheetId);
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("RequisicaoDepto");

	var START_ROW = 3;
	var START_COLUMN = 1;
	var lastRow = sheet.getLastRow();
	var lastColumn = sheet.getLastColumn();

	var read = sheet.getSheetValues(START_ROW, START_COLUMN, lastRow - 2, lastColumn);

	return objectDep_(read);
}

/**
 * From the raw values of the departments, create an array of objects
 * @param  {Object[]} array of raw values
 * @return {Object[]} Array of objects that represents departments
 */
function objectDep_(deps) {
	var NAME = 0;
	var MINALL = 1;
	var MINAREA = 2;
	var MINMEN = 3;
	var MINWOMEN = 4;
	var MAXALL = 5;
	var MAXMEN = 6;
	var MAXWOMEN = 7;
	var result = [];
	var i;

	for (i = 0; i < deps.length; i++) {
		var department = {
			name: deps[i][NAME],
			minAll: deps[i][MINALL],
			minArea: deps[i][MINAREA],
			minMen: deps[i][MINMEN],
			minWomen: deps[i][MINWOMEN],
			maxAll: deps[i][MAXALL],
			maxMen: deps[i][MAXMEN],
			maxWomen: deps[i][MAXWOMEN],
			presentAll: 0,
			presentArea: 0,
			presentMen: 0,
			presentWomen: 0,
			people: 0
		};
		result.push(department);
	}
	return result;
}