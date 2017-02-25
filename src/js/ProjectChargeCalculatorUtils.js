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
	static getFunctionCost(fct){
		return (
			0.25 * fct.ihm[0] +
			0.5 * fct.ihm[1] +
			1 * fct.ihm[2] +
			2 * fct.ihm[3] +
			0.25 * fct.traitement[0] +
			0.5 * fct.traitement[1] +
			1 * fct.traitement[2] +
			2 * fct.traitement[3]
		);
	}

	/**
	 * Calcule les couts d'un module
	 */
	static getModuleCost(module){
		// Si pas de fonctionnalite, cout 0
		if(module.functions.length === 0){
			return 0;
		}

		// Si une fonctionnalite, on renvoie son cout
		if(module.functions.length === 1){
			return this.getFunctionCost(module.functions[0]);
		}

		// Sinon, on fait une somme grace a reduce
		// attention, reduce renvoie la derniere valeur calcule
		// ou une valeur du tableau, il faut donc verifier le type
		// avant de faire la somme
		return module.functions.reduce((a,b)=>{
			return (
				(typeof a === "object" ? this.getFunctionCost(a): a)
				+
				(typeof b === "object" ? this.getFunctionCost(b): b)
			);
		});
	}

	/**
	 * Calcule le cout d'un projet
	 */
	static getProjectCost(modules){
		// si pas de module, cout 0
		if(modules.length === 0){
			return 0;
		}

		// Si un module, on renvoie son cout
		if(modules.length === 1){
			return this.getModuleCost(modules[0]);
		}

		// Sinon, on fait une somme grace a reduce
		// attention, reduce renvoie la derniere valeur calcule
		// ou une valeur du tableau, il faut donc verifier le type
		// avant de faire la somme
		return modules.reduce((a,b)=>{
			return (
				(typeof a === "object" ? this.getModuleCost(a) : a )
				+
				(typeof b === "object" ? this.getModuleCost(b) : b )
			);
		});
	}
}

export default ProjectChargeCalculatorUtils;
