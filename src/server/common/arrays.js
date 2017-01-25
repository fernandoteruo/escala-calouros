/**
 * Creates a 2d array of given sizes
 * @param {number} heigth
 *     The height (y-dimension) of a 2d array
 * @param {number} width
 *     The width (x-dimensin) of a 2d array
 * @return {Object[]} array
 *     An empty 2d array with defined dimensions
 */
function create2dArray_(height, width) {
	var array = new Array(height);
	for (var i = 0; i < height; i++) {
		array[i] = new Array(width);
	}
	return array;
}

/**
 * Shuffle a given array
 * @param  {Object[]} a array to be shuffled
 */
function shuffle_(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

/**
 * Compare 2 property object in an array
 */
function compare_(a, b) {
	if (a.key > b.key){
		return 1;
	} else if (a.key < b.key) {
		return -1;
	}
	return 0;
}

