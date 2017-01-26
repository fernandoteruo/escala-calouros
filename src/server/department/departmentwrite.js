/**
 * Write data
 * @param  {Object[]} result          An array of the result to set
 * @param  {Object[]} color           An array of colours to set
 * @param  {number} lineSheet The number of line to write on
 */
function writeDepartment_(result, color, lineSheet, sheetId) {
	Logger.log("Realizando escrita de informações em aba VisaoDepto...");
	writeLog_(sheetId);
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("VisaoDepto");

	var START_COLUMN = 1;
	var NUM_ROWS = 1;
	var lastColumn = sheet.getLastColumn();

	var range = sheet.getRange(lineSheet, START_COLUMN, NUM_ROWS, lastColumn);
	range.setValues(result);
	range.setFontColors(color);
}