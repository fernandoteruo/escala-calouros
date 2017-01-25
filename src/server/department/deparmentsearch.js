/**
 * Calc of available departments
 * @param  {Object[]} people Array of people
 * @param  {Object[]} depts  Array of deparments
 * @return {Object[]}        Array of deparments available
 */
function deptsAvailable_(people, depts) {
	// check how many people do not have an assigned deparment
	var noDeptPeople = 0;
	var i, j, person, ratePeopleDepartment, department, numberDepts, rate, diff, numbWorstRate, numbDepartmentLess, numBestRate;
	var sumDepts = 10;
	var randomDepts = [];
	var ratePresentMin = [];
	var deparmentsLess = 1000;
	var deparmentsMore = -1000;
	var worstRate = 1000;
	var bestRate = -1000;

	for (i = 0; i < people.length; i++) {
		person = people[i];
		if (person.shift == "SD") {
			noDeptPeople++;
		}
	}

	ratePeopleDepartment = Math.max(Math.floor(noDeptPeople / sumDepts), 1);
	// creates an array of departments with the same size of people who do not have an assigned department
	for (i = 0; i < depts.length; i++) {
		department = depts[i];
		j = department.presentAll;
		while (j < Math.min(department.maxAll, ratePeopleDepartment)) {
			randomDepts.push(department);
			j++;
		}
	}
	//Adjust the number of departments, checking the rate compared to the minimum and how many people a department already have
	for (i = 0; i < depts.length; i++) {
		department = depts[i];
		numberDepts = 0;
		for (j = 0; j < randomDepts.length; j++) {
			if (randomDepts[j] == department) {
				numberDepts++;
			}
		}
		numberDepts += department.presentAll;
		deparmentsLess = numberDepts < deparmentsLess ? numberDepts : deparmentsLess;
		deparmentsMore = numberDepts > deparmentsMore ? numberDepts : deparmentsMore;
		rate = numberDepts - department.minAll; //quanto menor pior eh
		worstRate = rate < worstRate ? rate : worstRate; //quanto menor pior eh
		bestRate = rate > bestRate ? rate : bestRate;
		ratePresentMin.push({
			department: department,
			qtd: numberDepts,
			rate: rate
		});
	}
	//If the difference between no dept assigned people and departments already available is above or below zero
	diff = noDeptPeople - randomDepts.length;
	if (diff > 0) {
		shuffle_(ratePresentMin);
		loopWhileDiffPos:
			while (diff > 0) {
				for (i = 0; i < ratePresentMin.length; i++) {
					if (diff === 0) {
						break loopWhileDiffPos;
					}
					if (ratePresentMin[i].rate == worstRate && ratePresentMin[i].qtd == deparmentsLess && ratePresentMin[i].qtd + 1 <= depts[i].maxAll) {
						randomDepts.push(depts[i]);
						ratePresentMin[i].qtd++;
						ratePresentMin[i].rate++;
						diff--;
					}
				}
				numbWorstRate = 0;
				numbDepartmentLess = 0;
				for (i = 0; i < ratePresentMin.length; i++) {
					if (ratePresentMin[i].rate == worstRate && ratePresentMin[i].qtd + 1 <= depts[i].maxAll) {
						numbWorstRate++;
					}
					if (ratePresentMin[i].qtd == deparmentsLess && ratePresentMin[i].qtd + 1 <= depts[i].maxAll) {
						numbDepartmentLess++;
					}
				}
				worstRate = numbWorstRate === 0 ? worstRate + 1 : worstRate;
				deparmentsLess = numbDepartmentLess === 0 ? deparmentsLess + 1 : deparmentsLess;
			}
	} else if (diff < 0) {
		shuffle_(ratePresentMin);
		loopWhileDiffNeg:
			while (diff < 0) { 
				loopForRandom: 
				for (i = 0; i < randomDepts.length; i++) {
					for (j = 0; j < ratePresentMin.length; j++) {
						if (diff === 0) {
							break loopWhileDiffNeg;
						}
						if (randomDepts[i] !== undefined && randomDepts[i].nome == ratePresentMin[j].department.nome && ratePresentMin[j].qtd == deparmentsMore && ratePresentMin[j].rate == bestRate) {
							randomDepts.splice(i, 1);
							ratePresentMin[j].qtd--;
							ratePresentMin[j].rate--;
							diff++;
							break;
						}
					}
					numBestRate = 0;
					for (j = 0; j < ratePresentMin.length; j++) {
						if (ratePresentMin[j].rate == bestRate) {
							numBestRate++;
						}
					}
					bestRate = numBestRate === 0 ? bestRate - 1 : bestRate;
				}
			}
	}
	return randomDepts;
}

/**
 * Check departments that need people
 * @param  {Object[]} depts Array of deparments
 * @return {Object}       Deparments that need people
 */
function searchLessMore_(depts) {
  var lessMen = 1000;
  var lessWomen = 1000;
  var lessAll = 1000;
  var moreMen = -1000;
  var moreWomen = -1000;
  var moreAll = -1000;
  var i;
  for (i = 0; i < depts.length; i++) {
    lessMen = depts[i].presentMen < lessMen ? depts[i].presentMen : lessMen;
    lessWomen = depts[i].presentWomen < lessWomen ? depts[i].presentWomen : lessWomen;
    lessAll = depts[i].presentAll < lessAll ? depts[i].presentAll : lessAll;
    moreMen = depts[i].presentMen > moreMen ? depts[i].presentMen : moreMen;
    moreWomen = depts[i].presentWomen > moreWomen ? depts[i].presentWomen : moreWomen;
    moreAll = depts[i].presentAll > moreAll ? depts[i].presentAll : moreAll;
  }
  
  return {lessMen: lessMen,lessWomen: lessWomen, lessAll: lessAll, 
          moreMen: moreMen, moreWomen: moreWomen, moreAll: moreAll};
}


