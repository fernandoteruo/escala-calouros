/**
 * It's the core of the system. It executes all the process of put people in deparments
 * @param  {number} shift The number of the shift to calc
 */
function executeShiftCalc_(shift, sheetId) {
	var ss = getSpreadsheet_(sheetId);
	var people, departments, startStatePeople, startStateDepartments, peopleAvailable, numAvailable, tries, bestResult, bestPeopleNoDept, peopleNoDept, time, validator, end;
	var start = new Date();

	ss.toast("Processamento iniciado às " + start.getHours() + "h" + start.getMinutes() + "m" + start.getSeconds() + "s", "Progresso", 2);

	Logger.log("Processamento do turno " + shift + " iniciado às " + start.getHours() + "h" + start.getMinutes() + "m" + start.getSeconds() + "s\n\n");
	setLog_("Etapa 0", "Processamento do turno " + shift + " iniciado às " + start.getHours() + "h" + start.getMinutes() + "m" + start.getSeconds() + "s\n\n");
	writeLog_(sheetId);

	people = readPeople_(shift, sheetId);
	departments = readDepts_(sheetId);

	startStatePeople = people;
	startStateDepartments = departments;

	setLog_("Etapa 1", "Informações lidas, iniciando alocação de calouros");
	peopleAvailable = calcPeopleAvailable_(people);
	writeLog_(sheetId);

	people = peopleAvailable.people;
	numAvailable = peopleAvailable.number;
	peopleSpecificCalc_(people, departments);
	for (var i = 0; i < people.length; i++) {
		Logger.log(people[i].name + " " + people[i].shift);
	}
	writeLog_(sheetId);

	setLog_("Etapa 2", "Calouros especificos alocados");
	tries = 0;
	bestPeopleNoDept = people.length;
	Logger.log("Iniciando cálculos de turnos para calouros geral");
	writeLog_(sheetId);
	while (bestPeopleNoDept > Math.ceil(numAvailable * 0.1)) {
		people = startStatePeople;
		departments = startStateDepartments;

		tries++;
		Logger.log("Tentiva número: " + tries + " iniciada");
		peopleGeneralCalc_(people, departments);

		peopleNoDept = checkPeopleNoDept_(people);

		bestResult = peopleNoDept < bestPeopleNoDept ? people : bestResult;
		bestPeopleNoDept = peopleNoDept < bestPeopleNoDept ? people : bestPeopleNoDept;

		if (tries >= 250 && bestPeopleNoDept < Math.ceil(numAvailable * 0.25)) {
			break;
		}

		people = peopleAdjustCalc_(people, departments);

		peopleNoDept = checkPeopleNoDept_(people);

		bestResult = peopleNoDept < bestPeopleNoDept ? people : bestResult;
		bestPeopleNoDept = peopleNoDept < bestPeopleNoDept ? people : bestPeopleNoDept;

		if (tries >= 250 && bestPeopleNoDept < Math.ceil(numAvailable * 0.25)) {
			break;
		}

		time = new Date();
		Logger.log("Tentiva número: " + tries + " finalizada em " + (time.getTime() - start.getTime()) / 1000 + " segundos");
		writeLog_(sheetId);
	}
	setLog_("Etapa 3", "Calouros alocados, verificando erros");
	writeShift_(people, shift, sheetId);
	updateTotalShifts_(shift, sheetId);
	consolidateToDepartmentView_(shift, sheetId);

	validator = validator_(shift, sheetId);
	if (validator.status) {
		setLog_("Etapa 4 - Erros", "Ver erros abaixo");
		SpreadsheetApp.getUi().alert(validator.msg);
	} else {
		setLog_("Etapa 4", "Não foram encontrados erros");
	}

	end = new Date();
	ss.toast("Processamento finalizado às " + end.getHours() + "h" + end.getMinutes() + "m" + end.getSeconds() + "s Tempo total decorrido: " + (end.getTime() - start.getTime()) / 1000 + " segundos", "Progresso", 3);
	Logger.log("Processamento finalizado às " + end.getHours() + "h" + end.getMinutes() + "m" + end.getSeconds() + "s \n Tempo total decorrido: " + (end.getTime() - start.getTime()) / 1000 + " segundos\n\n");
	writeLog_(sheetId);
	setLog_("Etapa 5", "Processamento finalizado");
}