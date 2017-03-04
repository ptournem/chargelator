class ProjectChargeCalculatorUtils{
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
			param.ihm[0] * fct.ihm[0] +
			param.ihm[1] * fct.ihm[1] +
			param.ihm[2] * fct.ihm[2] +
			param.ihm[3] * fct.ihm[3] +
			param.traitement[0] * fct.traitement[0] +
			param.traitement[1] * fct.traitement[1] +
			param.traitement[2] * fct.traitement[2] +
			param.traitement[3] * fct.traitement[3]
		);
	}

	/**
	 * Calcule les couts d'un module
	 */
	static getModuleCost(module,param){
		// Si pas de fonctionnalite, cout 0
		if(module.functions.length === 0){
			return 0;
		}

		// Si une fonctionnalite, on renvoie son cout
		if(module.functions.length === 1){
			return this.getFunctionCost(module.functions[0],param);
		}

		// Sinon, on fait une somme grace a reduce
		// attention, reduce renvoie la derniere valeur calcule
		// ou une valeur du tableau, il faut donc verifier le type
		// avant de faire la somme
		return module.functions.reduce((a,b)=>{
			return (
				(typeof a === "object" ? this.getFunctionCost(a,param): a)
				+
				(typeof b === "object" ? this.getFunctionCost(b,param): b)
			);
		});
	}

	/**
	 * Calcule le cout d'un projet
	 */
	static getProjectCost(modules,param){
		// si pas de module, cout 0
		if(modules.length === 0){
			return 0;
		}

		// Si un module, on renvoie son cout
		if(modules.length === 1){
			return this.getModuleCost(modules[0],param);
		}

		// Sinon, on fait une somme grace a reduce
		// attention, reduce renvoie la derniere valeur calcule
		// ou une valeur du tableau, il faut donc verifier le type
		// avant de faire la somme
		return modules.reduce((a,b)=>{
			return (
				(typeof a === "object" ? this.getModuleCost(a,param) : a )
				+
				(typeof b === "object" ? this.getModuleCost(b,param) : b )
			);
		});
	}
}

export default ProjectChargeCalculatorUtils;
