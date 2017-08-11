class Utils{
	static uuid() {
		/*jshint bitwise:false */
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? ((random & 3) | 8) : random))
			.toString(16);
		}

		return uuid;
	}

	static store(namespace, data) {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		var store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || [];
	}

	/**
	 * Calcule le cout d'une fonctionnalite
	 */
	static getFunctionCost(fct,param){
		return (
			Utils.parseCoef(param.ihm[0]) * fct.ihm[0] +
			Utils.parseCoef(param.ihm[1]) * fct.ihm[1] +
			Utils.parseCoef(param.ihm[2]) * fct.ihm[2] +
			Utils.parseCoef(param.ihm[3]) * fct.ihm[3] +
			Utils.parseCoef(param.traitement[0]) * fct.traitement[0] +
			Utils.parseCoef(param.traitement[1]) * fct.traitement[1] +
			Utils.parseCoef(param.traitement[2]) * fct.traitement[2] +
			Utils.parseCoef(param.traitement[3]) * fct.traitement[3]
		);
	}

	/**
	 * Parse les coefs
	 */
	static parseCoef(coef){
		// parse le float
		let parsed  = parseFloat(coef);
		// verifie que c'est un number
		if(isNaN(parsed)){
			return 0;
		}

		// renvoie la valeur parsé
		return parsed;
	}


	/**
	 * Calcule les couts d'un module
	 */
	static getFunctionsCost(functions,param){
		// Si pas de fonctionnalite, cout 0
		if(functions.length === 0){
			return 0;
		}

		// Si une fonctionnalite, on renvoie son cout
		if(functions.length === 1){
			return this.getFunctionCost(functions[0],param);
		}

		// Sinon, on fait une somme grace a reduce
		// attention, reduce renvoie la derniere valeur calcule
		// ou une valeur du tableau, il faut donc verifier le type
		// avant de faire la somme
		return functions.reduce((a,b)=>{
			return (
				(typeof a === "object" ? this.getFunctionCost(a,param): a)
				+
				(typeof b === "object" ? this.getFunctionCost(b,param): b)
			);
		});
	}


	/**
	 * Calcule les couts d'une section en fonction du coup de réalisation et
	 * des pourcentages des items de la section
	 */
	static getSectionCost(inner, cost,connexeCosts){
		let ret = 0;

		inner.forEach((item)=> {
			if(item.editable ){
				if(connexeCosts.has(item.label)){
					ret+= connexeCosts.get(item.label);
				}
			} else {
				ret+= Math.ceil((cost/47)*item.percentage);
			}
		});
		return ret;
	}

	/**
	 * ceil with decimal
	 */
	static ceilDecimal(value,decimal){
		const factor = Math.pow(10,decimal);
		return Math.ceil(value * factor) / factor;
	}
}

export default Utils;
