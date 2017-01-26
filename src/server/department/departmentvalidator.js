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
	var department, i, msg;
	for (i = 0; i < depts.length; i++) {
		department = depts[i];
		if (department.presentAll < department.minAll) {
			errors++;
			msg = "O depto " + department.name + " possui menos calouros do que o minímo. Possui: " + department.presentAll + ", esperado " + department.minAll + "\n";
			msgs += msg;
			setLogErr_(msg);
		}
		if (department.presentMen < department.minMen) {
			errors++;
			msg = "O depto " + department.name + " possui menos homens do que o minímo. Possui: " + department.presentMen + ", esperado " + department.minMen + "\n";
			msgs += msg;
			setLogErr_(msg);
		}
		if (department.presentWomen < department.minWomen) {
			errors++;
			msg = "O depto " + department.name + " possui menos mulheres do que o minímo. Possui: " + department.presentWomen + ", esperado " + department.minWomen + "\n";
			msgs += msg;
			setLogErr_(msg);
		}
		if (department.presentArea < department.minArea) {
			errors++;
			msg = "O depto " + department.name + " possui menos calouros da área do que o minímo. Possui: " + department.presentArea + ", esperado " + department.minArea + "\n";
			msgs += msg;
			setLogErr_(msg);
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
	var numMax = 0;
	var numMin = 0;
	var i, msg;
	var deptsMore = [];
	var deptsLess = [];
	for (i = 0; i < depts.length; i++) {
		max = depts[i].presentAll > max ? depts[i].presentAll : max;
		min = depts[i].presentAll < min ? depts[i].presentAll : min;
	}
	if (max - min <= 1) {
		return {qtd: 0, msgs: ""};
	}

	for (i = 0; i < depts.length; i++) {
		if (depts[i].presentAll == max) {
			deptsMore.push(depts[i].name);
			numMax++;
		} else if (depts[i].presentAll == min) {
			deptsLess.push(depts[i].name);	
			numMin++;
		}
	}

	msg = "" + deptsMore.toString() + " possuem " + max + " calouros, enquanto " + deptsLess.toString() + " tem apenas " + min + ". Confira o erro na aba VisaoDepto, para evitar este problema adeque o máximo dos deptos de acordo com a qtd de calouros na aba RequisicaoDepto\n";
	setLogErr_(msg);
	return {qtd: numMax - numMin, msgs: msg};
}