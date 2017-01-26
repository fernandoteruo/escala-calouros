function updateTotalShifts_(shiftNum, sheetId) {
	Logger.log("Calculando atualização de total de shift...");
	writeLog_(sheetId);
	var i, j, shift, person, department;
	var people = readPeople_(shiftNum, sheetId);
	var cme;
	var enf;
	var nut;
	var od;
	var pf;
	var pm; 
	var pod;
	var pt;
	var sec;
	var tc;

	for (i = 0; i < people.length; i++) {
		cme = 0;
		enf = 0;
		nut = 0;
		od = 0;
		pf = 0;
		pm = 0;
		pod = 0;
		pt = 0;
		sec = 0;
		tc = 0;
		person = people[i];
		shift = [];
		for (j = 0; j < person.previousEvents.length; j++) {
			shift.push(person.previousEvents[j]);
		}
		shift.push(person.s1);
		shift.push(person.s2);
		shift.push(person.s3);
		shift.push(person.s4);
		shift.push(person.s5);
		shift.push(person.s6);
		shift.push(person.s7);
		shift.push(person.s8);
		shift.push(person.s9);
		shift.push(person.s10);
		shift.push(person.s11);
		shift.push(person.s12);
		shift.push(person.s13);
		shift.push(person.s14);

		for (j = 0; j < shift.length; j++) {
			department = shift[j];
			switch (department) {
				case 'CME':
					cme++;
					break;
				case 'ENF':
					enf++;
					break;
				case 'NUT':
					nut++;
					break;
				case 'OD':
					od++;
					break;
				case 'PF':
					pf++;
					break;
				case 'PM':
					pm++;
					break;
				case 'POD':
					pod++;
					break;
				case 'PT':
					pt++;
					break;
				case 'SEC':
					sec++;
					break;
				case 'TC':
					tc++;
					break;
			}
		}
		person.cme = cme;
		person.enf = enf;
		person.nut = nut;
		person.od = od;
		person.pf = pf;
		person.pm = pm;
		person.pod = pod;
		person.pt = pt;
		person.sec = sec;
		person.tc = tc;
	}

	writeTotal_(people, sheetId);
}