/**
 * Get current active spreadsheet
 * @return {Object} the spreadsheet
 */
function getSpreadsheet_(id) {
	var ss = SpreadsheetApp.openById(id);
	return ss;
}


/**
 * Installable onEdit trigger
 */
function onEditSs(e, sheetId) {
	var shift;
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("EscalaTurnos");
	var lastRow = sheet.getLastRow();
	var validator;
	if (e.source.getSheetName() == 'EscalaTurnos' && e.range.getRow() > 2 && e.range.getRow() <= lastRow && e.range.getColumn() > 4 && e.range.getColumn() < 20) {
		Logger.log("Realizando edição de turnos manualmente...\n\n");
		setStartProps_("Etapa 0", "Realizando edição de turnos manualmente...");
		if (e.range.getColumn() != 5) {
			shift = e.range.getColumn() - 5;
			updateTotalShifts_(shift, sheetId);
			consolidateToDepartmentView_(shift, sheetId);
			validator = validator_(shift, sheetId);
			if (validator.status) {
				setProp_("Etapa 1 - Erros", "Ver erros abaixo");
				Logger.log(validator.msg);
			} else {
				setProp_("Etapa 1", "Não foram encontrados erros");
			}
		}
		Logger.log("Edição de turnos manual finalizada... \n\n");
		setProp_("Etapa 2", "Fim de edição manual");
		writeLog_(sheetId);
	}
}


/**
 * [processaEscalaCalouros description]
 * @return {[type]} [description]
 */
function getShiftToCalc(sheetId) {
	var ss = getSpreadsheet_(sheetId);
	var ui = SpreadsheetApp.getUi();
	var response = ui.prompt('Turno', 'Digite o número do turno para cálculo (número entre 1 e 14)', ui.ButtonSet.OK_CANCEL);

	if (response.getSelectedButton() == ui.Button.OK && response.getResponseText() != " ") {
		Logger.log("Turno a ser calculado: " + response.getResponseText());
		executeShiftCalc_(parseInt(response.getResponseText()), sheetId);
	}
}