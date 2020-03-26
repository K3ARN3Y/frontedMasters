function add (first, second) {
	return first + second;
}

function sub (first, second) {
	return first - second;
}

function mul (first, second) {
	return first * second;
}

function square (number) {
	return number * number;
}

function indentityf (x) {
	return function () {
		return x;
	};
}

function addf (first) {
	return function (second) {
		return first + second;
	}
}

function liftf (binary) {
	return function (first) {
		return function (second) {
			return binary(first, second);
		};
	};
}

function curry (binary, first) {
	return liftf(binary, first);
}

var inc = addf(1);
var inc = liftf(add) (1);
var inc = curry(add, 1);

function twice (binary) {
	return function (n) {
		return binary(n, n);
	};
}

function reverse (binary) {
	return function (first, second) {
		return binary(second, first);
	};
}

function composeu (unary1, unary2) {
	return function (n) {
		return unary2(unary1(n));
	};
}

function composeb (binary1, binary2) {
	return function (x, y, z) {
		return binary2(z, binary1(x, y));
	};
}

function limit (binary, limit) {
	return function (x, y) {
		if (limit >= 1) {
			limit -= 1;
			return binary(x, y);
		}
		return undefined;
	};
}

function from (start) {
	return function () {
		var next = start;
		start += 1;
		return next;
	};
}

function to (gen, end) {
	return function () {
		var value = gen ();
		if (value < end) {
			return value;
		}
		return undefined;
	};
}

function fromTo (start, end) {
	return to(
		from(start),
		end
	);
}

function element (array, generator) {
	if (generator === undefined) {
		generator = fromTo(0, array.length);
	}
	return function () {
		var index = generator();
		if (index !== undefined) {
			return array[index];
		}
	};
}

function collect (generator, array)	 {
	return function () {
		var value = generator();
		if (value !== undefined) {
			array.push(value);
		}
		return value;
	};
}

function third (value) {
	return (value % 3) === 0;
}

function filter (generator, predicate) {
	return function () {
		var value;
		do {
			value = gen();
		}	while (
				value !== undefined && !predicate(value)
		);
		return value;
	};
}

function filter2 (generator, predicate) {
	return function recur () {
		var value = gen();
		if (
			value === undefined
			|| predicate (value)
		) {
			return value;
		}
		return recur();
	};
}

function concat (generator1, generator2) {
	var gen = generator1;
	return function () {
		var value = gen();
		if (value !== undefined) {
			return value;
		}
		gen = generator2;
		return gen();
	};
}

function concat2 (...gens) {
	var next = element(gens);
	var gen = next();
	return function recur() {
		var value = gen();
		if (value === undefined) {
			gen = next();
			if (gen !== undefined) {
				return recur();
			}
		}
		return value;
	}
}

function gensymf (prefix) {
	var number = 0;
	return function () {
		number += 1;
		return prefix.toString() + number;
	};
}

function gensymff (unary, seed) {
	return function (prefix) {
		var number = seed;
		return function () {
			number = unary(number);
			return prefix.toString() + number;
		};
	};
}

function fibonaccif (x, y) {
	var index = 0;
	return function () {
		var next;
		if (index === 0) {
			index += 1;
			return x;
		} else if (index === 1) {
			index += 1;
			return y;
		} else {
			next = x + y;
			x = y;
			y = next;
			return next;
		}
	};
}

function fibonaccif2 (a, b) {
	var i = 0;
	return function () {
		var next;
		switch (i) {
			case 0:
				i = 1;
				return a;
			case 1:
				i = 2;
				return b;
			default:
				next = a + b;
				a = b;
				b = next;
				return next;
		}
	};
}

function fibonaccif3 (a, b) {
	return function () {
		var next = a;
		a = b;
		b += next;
		return next;
	}
}

function counter (n) {
	var count = n;
	return {
		up: function () {
			return count += 1;
		},
		down: function () {
			return count -= 1;
		}
	};
}

function revocable (binary) {
	return {
		invoke: function (first, second) {
			if (binary !== undefined) {
				return binary( first, second);
			}
		},
		revoke: function () {
			binary = undefined;
		}
	};
}

function m (value, source) {
	return {
		value: value,
		source: (typeof source === 'string')
			? source
			: String(value)
	};
}

function addm (obj1, obj2) {
	return m(
		a.value + b.value,
		"(" + a.source + "+" + b.source + ")"
	);
}

function liftm (binary, string) {
	return function (first, second) {
		if (typeof first === 'number') {
			first = m(first);
		}
		if (typeof second === 'number') {
			second = m(second);
		}
		return m(
			binary(first.value, second.value),
			"(" + first.source + string + second.source + ")"
		);
	};
}

function exp (value) {
	return (Array.isArray(value))
		? value[0](
				exp(value[1]),
				exp(value[2])
		)
		: value;
}

function addg (first) {
	function more (next) {
		if (next === undefined) {
			return first;
		}
		first += next;
		return more;
	}
	if (first !== undefined) {
		return more;
	}
}

function liftg (binary) {
	return function (first) {
		if (first === undefined) {
			return first;
		}
		return function more (next) {
			if (next === undefined) {
				return first;
			}
			first = binary(first, next);
			return more;
		};
	};
}

function arrayg (first) {
	var array = [];
	function more (next) {
		if (next === undefined) {
			return array;
		}
		array.push(next);
		return more;
	}
	return more(first);
}

function arrayg2 (first) {
	if (first === undefined) {
		return [];
	}
	return liftg(
		function (array, value) {
			array.push(value);
			return array;
	)([first]);
}

function continuize (unary) {
	return function (cb, arg) {
		cb(unary(arg));
	};
}

function continuize2 (any) {
	return function (callback, ...x) {
		return callback(any(...x));
	};
}

function constructor (init) {
	var that = other_contructor(init),
		member,
		method = function () {
			// init, member, method
		};
	that.method = method;
	return that;
}

function constructor2 (spec) {
	let {member} = spec;
	const {other} = other_contructor(spec);
	const method = function () {
		// spec, member, other, method
	};
	return Object.freeze({
		method,
		other
	});
}

 function vector () {
 	var array = [];
 	return {
 		append: function (value) {
 			array.push(value);
 		},
 		store: function (index, value) {
 			array[index] = value;
 		},
 		get: function (index) {
 			return array[index];
 		}
 	}
 }