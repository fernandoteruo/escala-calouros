/**
 * Write the calc'd shift
 * @param  {Object[]} people Array of people
 */
function writeShift_(people, shift, sheetId) {
	Logger.log("Realizando escrita de turno");
	writeLog_(sheetId);
	var i; 
	var ROW = 3;
	var NUMBER_COLUMN = 1;
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("EscalaTurnos");
	var data = create2dArray_(people.length, NUMBER_COLUMN);
	for (i = 0; i < people.length; i++) {
		data[i][0] = people[i].shift;
	}

	sheet.getRange(ROW, shift + 5, people.length, NUMBER_COLUMN).setValues(data);
}

/**
 * Write the sum of shifts
 * @param  {Object[]} people Array of people
 */
function writeTotal_(people, sheetId) {
	Logger.log("Realizando escrita total de turnos de people...");
	writeLog_(sheetId);
	var ROW = 3;
	var COLUMN = 20;
	var NUMBER_COLUMN = 11;
	var i, person;
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("EscalaTurnos");
	var data = create2dArray_(people.length, NUMBER_COLUMN);

	for (i = 0; i < people.length; i++) {
		person = people[i];
		data[i][0] = person.cme + person.enf + person.nut + person.od + person.pf + person.pm + person.pod + person.pt + person.sec + person.tc;
		data[i][1] = person.cme;
		data[i][2] = person.enf;
		data[i][3] = person.nut;
		data[i][4] = person.od;
		data[i][5] = person.pf;
		data[i][6] = person.pm;
		data[i][7] = person.pod;
		data[i][8] = person.pt;
		data[i][9] = person.sec;
		data[i][10] = person.tc;
	}

	sheet.getRange(ROW, COLUMN, people.length, NUMBER_COLUMN).setValues(data);
}