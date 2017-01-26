function validator_(shift, sheetId) {
	Logger.log("Validando resultado de processamento... ");
	writeLog_(sheetId);
	var people = readPeople_(shift, sheetId);
	var depts = readDepts_(sheetId);
	var numManual = 0;
	var numNoDept = 0;
	var errorsManual = 0;
	var errorsNoDept = 0;
	var sumErrors = 0;
	var errorsMsgs, i, sizeErrProp, errorDept, errorsPeople, errorsEq;

	for (i = 0; i < people.length; i++) {
		if (people[i].shift == "M") {
			numManual++;
		}
		if (people[i].shift == "SD") {
			numNoDept++;
		}
	}
	updateAllDepartments_(depts, people);
	errorDept = checkMinDept_(depts);
	errorsManual = parseInt(numManual);
	errorsNoDept = parseInt(numNoDept);
	errorsPeople = checkPeople_(people, shift, sheetId);
	errorsEq = checkEquilibrium_(depts);
	sumErrors = errorDept.qtd + errorsManual + errorsNoDept + errorsPeople.qtd;
	sizeErrProp = errorDept.qtd;
	errorsMsgs = "Foi encontrado um total de " + sumErrors + " erros!\n";
	if (errorDept.qtd !== 0) {
		errorsMsgs += "- Há " + errorDept.qtd + " erros de quantidade miníma em departamentos\n";
		errorsMsgs += errorDept.msgs;
	}
	if (errorsManual !== 0) {
		errorsMsgs += "- Há " + errorsManual + " calouros de Odonto ou ENf que devem ser alocados manualmente\n";
		setLogErr_("Há " + errorsManual + " calouros de Odonto ou ENf que devem ser alocados manualmente - confira esses erros destacados em vermelho na aba 'EscalaTurnos'\n");
	}
	if (errorsNoDept !== 0) {
		errorsMsgs += "- Há " + errorsNoDept + " calouros sem departamento, alocar manualmente\n";
		setLogErr_(" Há " + errorsNoDept + " calouros sem departamento, alocar manualmente - confira esses erros destacados em vermelho na aba 'EscalaTurnos'\n");
	}
	if (errorsPeople.qtd !== 0) {
		errorsMsgs += "- Há " + errorsPeople.qtd + " erros com calouros, por exemplo repetição antes do tempo\n";
		errorsMsgs += errorsPeople.msgs;
	}
	if (errorsEq.qtd !== 0) {
		errorsMsgs += "Há desequilibrio na quantidade entre departamentos\n";
		errorsMsgs += errorsEq.msgs;
	}
	if (errorDept.qtd !== 0 || errorsManual !== 0 || errorsNoDept !== 0 || errorsPeople.qtd !== 0 || errorsEq.qtd !== 0) {
		writeErroOnSheet_(sheetId);
		return {
			status: true,
			msg: errorsMsgs
		};
	} else {
		return {
			status: false,
			msg: "uhuullll"
		};
	}
}

function runValidator(sheetId) {
	var valid;
	var ss = getSpreadsheet_(sheetId);
	var ui = SpreadsheetApp.getUi();
	var response = ui.prompt('Turno', 'Digite o número do turno para validação (número entre 1 e 14)', ui.ButtonSet.OK_CANCEL);

	if (response.getSelectedButton() == ui.Button.OK && response.getResponseText() != " ") {
		valid = validator_(parseInt(response.getResponseText()), sheetId);

		if (valid.status) {
			Logger.log("Validação finalizada, foram encontrados erros.");
			writeLog_(sheetId);
			SpreadsheetApp.getUi().alert(valid.msg);
		} else {
			Logger.log("Validação finalizada, nenhum erro encontrado");
			writeLog_(sheetId);
		}
	}
}