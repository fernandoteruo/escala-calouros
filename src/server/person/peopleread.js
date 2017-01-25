/**
 * Read all people
 * @param  {number} shift the shift to calc
 * @return {Object[]}       Array of people read
 */
function readPeople_(shift, sheetId) {
	Logger.log("Leitura de calouros");
	var ss = getSpreadsheet_(sheetId);
	var sheet = ss.getSheetByName("EscalaTurnos");
	var START_ROW = 3;
	var START_COLUMN = 1;
	var lastRow = sheet.getLastRow();
	var lastColumn = sheet.getLastColumn();

	var people = sheet.getSheetValues(START_ROW, START_COLUMN, lastRow - 2, lastColumn);

	return objectPeople_(people, shift);
}

/**
 * It creates an array of object from raw values of people
 * @param  {Object[]} people array of people
 * @param  {number} shift the shift to calc
 * @return {Object[]}       Array of objects representing people
 */
function objectPeople_(people, shift) {
	var NAME = 0;
	var GENDER = 1;
	var OD = 2;
	var ENF = 3;
	var PREVIOUS = 4;
	var S1 = 5;
	var S2 = 6;
	var S3 = 7;
	var S4 = 8;
	var S5 = 9;
	var S6 = 10;
	var S7 = 11;
	var S8 = 12;
	var S9 = 13;
	var S10 = 14;
	var S11 = 15;
	var S12 = 16;
	var S13 = 17;
	var S14 = 18;
	var NCME = 20;
	var NENF = 21;
	var NNUT = 22;
	var NOD = 23;
	var NPF = 24;
	var NPM = 25;
	var NPOD = 26;
	var NPT = 27;
	var NSEC = 28;
	var NTC = 29;
	var i;
	var result = [];

	for (i = 0; i < people.length; i++) {
		var person = {
			name: people[i][NAME],
			gender: people[i][GENDER],
			areaOD: people[i][OD],
			areaENF: people[i][ENF],
			previousEvents: people[i][PREVIOUS].split(/[\s,]+/),
			shift: people[i][shift + 4],
			s1: people[i][S1],
			s2: people[i][S2],
			s3: people[i][S3],
			s4: people[i][S4],
			s5: people[i][S5],
			s6: people[i][S6],
			s7: people[i][S7],
			s8: people[i][S8],
			s9: people[i][S9],
			s10: people[i][S10],
			s11: people[i][S11],
			s12: people[i][S12],
			s13: people[i][S13],
			s14: people[i][S14],
			cme: people[i][NCME],
			enf: people[i][NENF],
			nut: people[i][NNUT],
			od: people[i][NOD],
			pf: people[i][NPF],
			pm: people[i][NPM],
			pod: people[i][NPOD],
			pt: people[i][NPT],
			sec: people[i][NSEC],
			tc: people[i][NTC]
		};
		result.push(person);
	}
	return result;
}