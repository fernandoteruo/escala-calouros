/**
 * Check if department is ok
 * @param  {Object[]} depts Array of deparments to check
 * @return {boolean}    true if dept is ok   
 */
function checkOdStatus_(depts) {
	var index_od, i;
	for (i = 0; i < depts.length; i++) {
		if (depts[i].name == "OD") {
			index_od = i;
		}
	}
	return depts[index_od].presentArea >= depts[index_od].minArea;
}

/**
 * Check if department is ok
 * @param  {Object[]} depts Array of deparments to check
 * @return {boolean}    true if dept is ok   
 */
function checkEnfStatus_(depts) {
	var index_enf, i;
	for (i = 0; i < depts.length; i++) {
		if (depts[i].name == "ENF") {
			index_enf = i;
		}
	}
	return depts[index_enf].presentArea >= depts[index_enf].minArea;
}

/**
 * Check number min of people in deparments
 * @param  {Object[]} depts Array of deparments
 * @return {Object}       boolean result and msgs
 */
function checkMinDept_(depts) {
	var errors = 0;
	var msgs = "";
	var department, i;
	for (i = 0; i < depts.length; i++) {
		department = depts[i];
		if (department.presentAll < department.minAll) {
			errors++;
			msgs += "O depto " + department.name + " possui menos calouros do que o minímo. Possui: " + department.presentAll + ", esperado" + department.minAll + "\n";

			setErrProp_("Validação - Erros ", "O depto " + department.name + " possui menos calouros do que o minímo. Possui: " + department.presentAll + ", esperado" + department.minAll + "\n");
		}
		if (department.presentMen < department.minMen) {
			errors++;
			msgs += "O depto " + department.name + " possui menos homens do que o minímo. Possui: " + department.presentMen + ", esperado" + department.minMen + "\n";
			setErrProp_("Validação - Erros ", "O depto " + department.name + " possui menos homens do que o minímo. Possui: " + department.presentMen + ", esperado" + department.minMen + "\n");
		}
		if (department.presentWomen < department.minWomen) {
			errors++;
			msgs += "O depto " + department.name + " possui menos mulheres do que o minímo. Possui: " + department.presentWomen + ", esperado " + department.minWomen + "\n";
			setErrProp_("Validação - Erros ", "O depto " + department.name + " possui menos mulheres do que o minímo. Possui: " + department.presentWomen + ", esperado " + department.minWomen + "\n");
		}
		if (department.presentArea < department.minArea) {
			errors++;
			msgs += "O depto " + department.name + " possui menos calouros da área do que o minímo. Possui: " + department.presentArea + ", esperado " + department.minArea + "\n";
			setErrProp_("Validação - Erros ", "O depto " + department.name + " possui menos calouros da área do que o minímo. Possui: " + department.presentArea + ", esperado " + department.minArea + "\n");
		}
	}

	return {
		qtd: errors,
		msgs: msgs
	};
}

/**
 * Check difference of people in different deparments
 * @param  {Object[]} depts Array of deparments
 * @return {number}       difference between department that has the most and the one that has the least
 */
function checkEquilibrium_(depts) {
	var errors = 0;
	var max = -1000;
	var min = 1000;
	var i;
	for (i = 0; i < depts.length; i++) {
		max = depts[i].presentAll > max ? depts[i].presentAll : max;
		min = depts[i].presentAll < min ? depts[i].presentAll : min;
	}
	if (max - min <= 1) {
		return 0;
	}
	return max - min;
}