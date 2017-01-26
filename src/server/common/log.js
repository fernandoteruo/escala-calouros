/**
 * Writes the log o a specific sheet
 * @return {[type]} [description]
 */
function writeLog_(sheetId) {
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("Log");
	var lastRow = sheet.getLastRow();
	var lastColumn = sheet.getLastColumn();
	var logs = Logger.getLog();
	var cutLog, previousLog, cutPreviousLog;
	if (lastRow >= 500) {
		sheet.getRange(1, 1, lastRow, lastColumn).clear();
		lastRow = 0;
	}
	lastRow = lastRow === 0 ? 1 : lastRow;
	cutLog = logs.slice(30, logs.length);
	previousLog = sheet.getRange(lastRow, 1).getValue();
	cutPreviousLog = previousLog.slice(30, previousLog.length);
	if (cutPreviousLog != cutLog) {
		sheet.getRange(lastRow + 1, 1).setValue(logs);
	}
	Logger.clear();
}

var stackLogErr = [];

function setLogErr_(value) {
	stackLogErr.push({
		key: "Validação - Erros",
		value: value
	});

	var docProps = PropertiesService.getScriptProperties();
	docProps.deleteAllProperties();
}

var stackLogGeneral = [];

function setLog_(key, value) {
	stackLogGeneral.push({
		key: key,
		value: value
	});

	var docProps = PropertiesService.getScriptProperties();
	docProps.deleteAllProperties();
}

/**
 * Process logs to show
 * @return {Object[]} Properties
 */
function getLogs() {
	var result = [];
	var docProps = PropertiesService.getScriptProperties();
	var propsErr = docProps.getProperty('propsErr');
	var propsLog = docProps.getProperty('propsLog');
	result.concat(propsErr);
	result.concat(propsLog);

	result.sort(compare_);
	return result;
}

function writeErroOnSheet_(sheetId) {
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("Erros");
	var lastRow = sheet.getLastRow();
	var lastColumn = sheet.getLastColumn();
	var write = create2dArray_(stackLogErr.length, 1);
	for (var i = 0; i < write.length; i++) {
		write[i][0] = stackLogErr[i].value;
	}
	sheet.getRange(1, 1, lastRow + 1, lastColumn + 1).clear();
	if (write.length > 0) {
		sheet.getRange(1, 1, write.length , 1).setValues(write);
	}
}