/**
 * [peopleAdjustCalc description]
 * @param  {[type]} people [description]
 * @param  {[type]} depts  [description]
 * @return {[type]}        [description]
 */
function peopleAdjustCalc_(people, depts) {

	var i, j, moreMen, moreWomen, moreAll, lessMen, lessWomen, lessAll, available;

	// verifica calouro sem depto e depts que precisam
	for (i = 0; i < people.length; i++) {
		moreMen = searchLessMore_(depts).moreMen;
		moreWomen = searchLessMore_(depts).moreWomen;
		moreAll = searchLessMore_(depts).moreAll;
		lessMen = searchLessMore_(depts).lessMen;
		lessWomen = searchLessMore_(depts).lessWomen;
		lessAll = searchLessMore_(depts).lessAll;
		if (people[i].shift == "SD") {
			for (j = 0; j < depts.length; j++) {
				if (people[i].gender == "H" && !checkAlready_(people[i], depts[j]) && depts[j].presentMen < depts[j].minMen && depts[j].presentAll + 1 <= depts[j].maxAll && depts[j].presentAll != moreAll && depts[j].presentWomen != moreWomen) {
					people[i].shift = depts[j].name;
					break;
				} else if (people[i].gender == "M" && !checkAlready_(people[i], depts[j]) && depts[j].presentWomen < depts[j].minWomen && depts[j].presentAll + 1 <= depts[j].maxAll && depts[j].presentAll != moreAll && depts[j].presentMen != moreMen) {
					people[i].shift = depts[j].name;
					break;
				} else if (!checkAlready_(people[i], depts[j]) && depts[j].presentAll < depts[j].minAll) {
					people[i].shift = depts[j].name;
					break;
				}
			}
			updateOneDepartment_(depts, people[i]);
		}
	}

	// verifica people sem depto e depts com menos
	updateAllDepartments_(depts, people);
	
	for (i = 0; i < people.length; i++) {
		moreMen = searchLessMore_(depts).moreMen;
		moreWomen = searchLessMore_(depts).moreWomen;
		moreAll = searchLessMore_(depts).moreAll;
		lessMen = searchLessMore_(depts).lessMen;
		lessWomen = searchLessMore_(depts).lessWomen;
		lessAll = searchLessMore_(depts).lessAll;
		if (people[i].shift == "SD") {
			for (j = 0; j < depts.length; j++) {
				if (people[i].gender == "H" && !checkAlready_(people[i], depts[j]) && depts[j].presentMen == lessMen && depts[j].presentAll != moreAll && depts[j].presentWomen != moreWomen && depts[j].presentAll + 1 <= depts[j].maxAll) {
					people[i].shift = depts[j].name;
					break;
				} else if (people[i].gender == "M" && !checkAlready_(people[i], depts[j]) && depts[j].presentWomen == lessWomen && depts[j].presentAll != moreAll && depts[j].presentMen != moreMen && depts[j].presentAll + 1 <= depts[j].maxAll) {
					people[i].shift = depts[j].name;
					break;
				} else if (!checkAlready_(people[i], depts[j]) && depts[j].presentAll == lessAll && depts[j].presentMen != moreMen && depts[j].presentWomen == moreWomen && depts[j].presentAll + 1 <= depts[j].maxAll) {
					people[i].
shift = depts[j].name;
					break;
				}
			}
			updateOneDepartment_(depts, people[i]);
		}
	}

	// verifica people que estão em depto que tem falta de um gender mas ta no maximo geral e troca
	for (i = 0; i < people.length; i++) {
		for (j = 0; j < depts.length; j++) {
			if (depts[j].presentMen < depts[j].minMen && depts[j].presentAll == depts[j].maxAll && people[i].gender == "M" && !checkAlready_(people[i], depts[j])) {
				depts[j].presentAll--;
				depts[j].presentWomen--;
				people[i] = "SD";
			} else if (depts[j].presentWomen < depts[j].minWomen && depts[j].presentAll == depts[j].maxAll && people[i].gender == "H" && !checkAlready_(people[i], depts[j])) {
				depts[j].presentAll--;
				depts[j].presentMen--;
				people[i] = "SD";
			}
		}
	}

	available = deptsAvailable_(people, depts);
	shuffle_(available);
	people = invertedGeneralCalc_(people, depts, available);

	return people;
}

/**
 * [invertedGeneralCalc description]
 * @param  {[type]} people         [description]
 * @param  {[type]} depts          [description]
 * @param  {[type]} deptsAvailable [description]
 * @return {[type]}                [description]
 */
function invertedGeneralCalc_(people, depts, deptsAvailable) {
	var i;
	var j;
	//Firstly, check the minimum
	for (i = people.length - 1; i >= 0; i--) {
		if (people[i].shift == "SD") {
			loopDeptsAvailableMin: for (j = 0; j < deptsAvailable.length; j++) {
				if (people[i].areaOD && deptsAvailable[j].name == "OD" || people[i].areaENF && deptsAvailable[j].name == "ENF") {
					continue loopDeptsAvailableMin;
				}
				if (!checkAlready_(people[i], deptsAvailable[j])) {
					if (people[i].gender == "H" && deptsAvailable[j].presentMen < deptsAvailable[j].minMen || people[i].gender == "M" && deptsAvailable[j].presentWomen < deptsAvailable[j].minWomen || deptsAvailable[j].presentAll < deptsAvailable[j].minAll) {
						people[i].shift = deptsAvailable[j].name;
						deptsAvailable.splice(j, 1);
						break loopDeptsAvailableMin;
					}
				}
			}
		}
		updateOneDepartment_(depts, people[i]);
	}
	updateAllDepartments_(depts, people);
	//Then consider the ones that have the least
	for (i = people.length - 1; i >= 0; i--) {
		if (people[i].shift == "SD") {
			loopDeptsAvailableLess: 
			for (j = 0; j < deptsAvailable.length; j++) {
				if (people[i].areaOD && deptsAvailable[j].name == "OD" || people[i].areaENF && deptsAvailable[j].name == "ENF") {
					continue loopDeptsAvailableLess;
				}
				if (!checkAlready_(people[i], deptsAvailable[j])) {
					if (people[i].gender == "H" && deptsAvailable[j].presentMen == searchLessMore_(depts).lessMen || people[i].gender == "M" && deptsAvailable[j].presentWomen == searchLessMore_(depts).lessWomen || deptsAvailable[j].presentAll == searchLessMore_(depts).lessAll) {
						people[i].shift = deptsAvailable[j].name;
						deptsAvailable.splice(j, 1);
						break loopDeptsAvailableLess;
					}
				}
			}
		}
		updateOneDepartment_(depts, people[i]);
	}
	updateAllDepartments_(depts, people);
	return people;
}