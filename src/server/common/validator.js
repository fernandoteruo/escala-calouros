function validator_(shift, sheetId) {
	Logger.log("Validando resultado de processamento... ");
	var people = readPeople_(shift, sheetId);
	var depts = readDepts_(sheetId);
	var numManual = 0;
	var numNoDept = 0;
	var errorDept = 0;
	var errorsManual = 0;
	var errorsNoDept = 0;
	var errorsPeople = 0;
	var sumErrors = 0;
	var errorsMsgs, i, sizeErrProp;

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
	errorsPeople = parseInt(checkPeople_(people, shift, sheetId));
	sumErrors = errorDept.qtd + errorsManual + errorsNoDept + errorsPeople;
	sizeErrProp = errorDept.qtd;
	errorsMsgs = "Foi encontrado um total de " + sumErrors + " erros!\n";
	if (errorDept.qtd !== 0) {
		errorsMsgs += "- Há " + errorDept.qtd + " erros de quantidade miníma em departamentos\n";
		errorsMsgs += errorDept.msgs;
	}
	if (errorsManual !== 0) {
		errorsMsgs += "- Há " + errorsManual + " calouros de Odonto ou ENf que devem ser alocados manualmente\n";
		
		setErrProp_("Validação - Erros ", "Há " + errorsManual + " calouros de Odonto ou ENf que devem ser alocados manualmente\n");
	}
	if (errorsNoDept !== 0) {
		errorsMsgs += "- Há " + errorsNoDept + " calouros sem departamento, alocar manualmente\n";
		setErrProp_("Validação - Erros ", "Há " + errorsManual + " calouros de Odonto ou ENf que devem ser alocados manualmente\n");
	}
	if (errorsPeople !== 0) {
		errorsMsgs += "- Há " + errorsPeople + " erros com calouros, por exemplo repetição antes do tempo\n";
		setErrProp_("Validação - Erros ", "Há " + errorsPeople + " erros com calouros, por exemplo repetição antes do tempo\n");
	}

	if (errorDept.qtd !== 0 || errorsManual !== 0 || errorsNoDept !== 0 || errorsPeople !== 0) {
		return {
			status: true,
			msg: errorsMsgs
		};
	} else {
		Logger.log("Validação realizada com sucesso, não há erros\n");
		return {status: false, msg: "uhuullll"};
	}
}