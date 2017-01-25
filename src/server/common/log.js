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
	if (lastRow >= 500) {
		sheet.getRange(1, 1, lastRow, lastColumn).clear();
		lastRow = 0;
	}
	sheet.getRange(lastRow + 1, 1).setValue(logs);
	Logger.clear();
}