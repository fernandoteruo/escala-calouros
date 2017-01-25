/**
 * Get infos on people sheet, process and write
 * @param  {number} shiftNumber The shift to calc
 */
function consolidateToDepartmentView_(shiftNumber, sheetId) {
	Logger.log("Consolidando informações de turnos para conferência em VisaoDepto...");
	var CME_H = 1;
	var CME_M = 2;
	var CME_N = 3;
	var ENF_A = 4;
	var ENF_NA = 5;
	var ENF_N = 6;
	var NUT_H = 7;
	var NUT_M = 8;
	var NUT_N = 9;
	var OD_A = 10;
	var OD_NA = 11;
	var OD_N = 12;
	var PF_H = 13;
	var PF_M = 14;
	var PF_N = 15;
	var PM_H = 16;
	var PM_M = 17;
	var PM_N = 18;
	var POD_H = 19;
	var POD_M = 20;
	var POD_N = 21;
	var PT_H = 22;
	var PT_M = 23;
	var PT_N = 24;
	var SEC_H = 25;
	var SEC_M = 26;
	var SEC_N = 27;
	var TC_H = 28;
	var TC_M = 29;
	var TC_N = 30;
	var people = readPeople_(shiftNumber, sheetId);
	var result = create2dArray_(1, TC_N + 1);
	var i, person, name, gender, odonto, enf, shift, depts, color, department, lineSheet;

	for (i = 0; i < result[0].length; i++) {
		if (i % 3 === 0) {
			result[0][i] = "";
		} else {
			result[0][i] = 0;
		}
	}
	result[0][0] = shiftNumber;
	for (i = 0; i < people.length; i++) {
		person = people[i];
		name = person.name;
		gender = person.gender;
		odonto = person.areaOD;
		enf = person.areaENF;
		shift = person.shift;
		switch (shift) {
			case 'CME':
				if (gender == 'H') {
					result[0][CME_H]++;
				} else {
					result[0][CME_M]++;
				}
				if (result[0][CME_N] === "") {
					result[0][CME_N] = name;
				} else {
					result[0][CME_N] = result[0][CME_N] + "\n" + name;
				}
				break;
			case 'ENF':
				if (enf) {
					result[0][ENF_A]++;
				} else {
					result[0][ENF_NA]++;
				}
				if (result[0][ENF_N] === "") {
					result[0][ENF_N] = name;
				} else {
					result[0][ENF_N] = result[0][ENF_N] + "\n" + name;
				}
				break;
			case 'NUT':
				if (gender == 'H') {
					result[0][NUT_H]++;
				} else {
					result[0][NUT_M]++;
				}
				if (result[0][NUT_N] === "") {
					result[0][NUT_N] = name;
				} else {
					result[0][NUT_N] = result[0][NUT_N] + "\n" + name;
				}
				break;
			case 'OD':
				if (odonto) {
					result[0][OD_A]++;
				} else {
					result[0][OD_NA]++;
				}
				if (result[0][OD_N] === "") {
					result[0][OD_N] = name;
				} else {
					result[0][OD_N] = result[0][OD_N] + "\n" + name;
				}
				break;
			case 'PF':
				if (gender == 'H') {
					result[0][PF_H]++;
				} else {
					result[0][PF_M]++;
				}
				if (result[0][PF_N] === "") {
					result[0][PF_N] = name;
				} else {
					result[0][PF_N] = result[0][PF_N] + "\n" + name;
				}
				break;
			case 'PM':
				if (gender == 'H') {
					result[0][PM_H]++;
				} else {
					result[0][PM_M]++;
				}
				if (result[0][PM_N] === "") {
					result[0][PM_N] = name;
				} else {
					result[0][PM_N] = result[0][PM_N] + "\n" + name;
				}
				break;
			case 'POD':
				if (gender == 'H') {
					result[0][POD_H]++;
				} else {
					result[0][POD_M]++;
				}
				if (result[0][POD_N] === "") {
					result[0][POD_N] = name;
				} else {
					result[0][POD_N] = result[0][POD_N] + "\n" + name;
				}
				break;
			case 'PT':
				if (gender == 'H') {
					result[0][PT_H]++;
				} else {
					result[0][PT_M]++;
				}
				if (result[0][PT_N] === "") {
					result[0][PT_N] = name;
				} else {
					result[0][PT_N] = result[0][PT_N] + "\n" + name;
				}
				break;
			case 'SEC':
				if (gender == 'H') {
					result[0][SEC_H]++;
				} else {
					result[0][SEC_M]++;
				}
				if (result[0][SEC_N] === "") {
					result[0][SEC_N] = name;
				} else {
					result[0][SEC_N] = result[0][SEC_N] + "\n" + name;
				}
				break;
			case 'TC':
				if (gender == 'H') {
					result[0][TC_H]++;
				} else {
					result[0][TC_M]++;
				}
				if (result[0][TC_N] === "") {
					result[0][TC_N] = name;
				} else {
					result[0][TC_N] = result[0][TC_N] + "\n" + name;
				}
				break;
		}
	}

	depts = readDepts_(sheetId);
	color = create2dArray_(1, TC_N + 1);
	for (i = 0; i < color[0].length; i++) {
		color[0][i] = "#000000";
	}
	for (i = 0; i < depts.length; i++) {
		department = depts[i];
		if (department.name == 'CME') {
			if (result[0][CME_H] < department.minMen) {
				color[0][CME_H] = "#FF0000";
			}
			if (result[0][CME_M] < department.minWomen) {
				color[0][CME_M] = "#FF0000";
			}
			if (result[0][CME_H] + result[0][CME_M] < department.minAll) {
				color[0][CME_N] = "#FF0000";
			}
		} else if (department.name == 'ENF') {
			if (result[0][ENF_A] < department.minArea) {
				color[0][ENF_A] = "#FF0000";
			}
			if (result[0][ENF_A] + result[0][ENF_NA] < department.minAll) {
				color[0][ENF_N] = "#FF0000";
			}
		} else if (department.name == 'NUT') {
			if (result[0][NUT_H] < department.minMen) {
				color[0][NUT_H] = "#FF0000";
			}
			if (result[0][NUT_M] < department.minWomen) {
				color[0][NUT_M] = "#FF0000";
			}
			if (result[0][NUT_H] + result[0][NUT_M] < department.minAll) {
				color[0][NUT_N] = "#FF0000";
			}
		} else if (department.name == 'OD') {
			if (result[0][OD_A] < department.minArea) {
				color[0][OD_A] = "#FF0000";
			}
			if (result[0][OD_A] + result[0][OD_NA] < department.minAll) {
				color[0][OD_N] = "#FF0000";
			}
		} else if (department.name == 'PF') {
			if (result[0][PF_H] < department.minMen) {
				color[0][PF_H] = "#FF0000";
			}
			if (result[0][PF_M] < department.minWomen) {
				color[0][PF_M] = "#FF0000";
			}
			if (result[0][PF_H] + result[0][PF_M] < department.minAll) {
				color[0][PF_N] = "#FF0000";
			}
		} else if (department.name == 'PM') {
			if (result[0][PM_H] < department.minMen) {
				color[0][PM_H] = "#FF0000";
			}
			if (result[0][PM_M] < department.minWomen) {
				color[0][PM_M] = "#FF0000";
			}
			if (result[0][PM_H] + result[0][PM_M] < department.minAll) {
				color[0][PM_N] = "#FF0000";
			}
		} else if (department.name == 'POD') {
			if (result[0][POD_H] < department.minMen) {
				color[0][POD_H] = "#FF0000";
			}
			if (result[0][POD_M] < department.minWomen) {
				color[0][POD_M] = "#FF0000";
			}
			if (result[0][POD_H] + result[0][POD_M] < department.minAll) {
				color[0][POD_N] = "#FF0000";
			}
		} else if (department.name == 'PT') {
			if (result[0][PT_H] < department.minMen) {
				color[0][PT_H] = "#FF0000";
			}
			if (result[0][PT_M] < department.minWomen) {
				color[0][PT_M] = "#FF0000";
			}
			if (result[0][PT_H] + result[0][PT_M] < department.minAll) {
				color[0][PT_N] = "#FF0000";
			}
		} else if (department.name == 'SEC') {
			if (result[0][SEC_H] < department.minMen) {
				color[0][SEC_H] = "#FF0000";
			}
			if (result[0][SEC_M] < department.minWomen) {
				color[0][SEC_M] = "#FF0000";
			}
			if (result[0][SEC_H] + result[0][SEC_M] < department.minAll) {
				color[0][SEC_N] = "#FF0000";
			}
		} else if (department.name == 'TC') {
			if (result[0][TC_H] < department.minMen) {
				color[0][TC_H] = "#FF0000";
			}
			if (result[0][TC_M] < department.minWomen) {
				color[0][TC_M] = "#FF0000";
			}
			if (result[0][TC_H] + result[0][TC_M] < department.minAll) {
				color[0][TC_N] = "#FF0000";
			}
		}
	}
	if (shiftNumber !== null) {
		lineSheet = shiftNumber + 2;
	}
	writeDepartment_(result, color, lineSheet, sheetId);
}