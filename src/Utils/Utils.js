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
		return  (
			Utils.parseCoef(param.ihm[0]) * Utils.parseInt(fct.ihm[0]) +
			Utils.parseCoef(param.ihm[1]) * Utils.parseInt(fct.ihm[1]) +
			Utils.parseCoef(param.ihm[2]) * Utils.parseInt(fct.ihm[2]) +
			Utils.parseCoef(param.ihm[3]) * Utils.parseInt(fct.ihm[3]) +
			Utils.parseCoef(param.traitement[0]) * Utils.parseInt(fct.traitement[0]) +
			Utils.parseCoef(param.traitement[1]) * Utils.parseInt(fct.traitement[1]) +
			Utils.parseCoef(param.traitement[2]) * Utils.parseInt(fct.traitement[2]) +
			Utils.parseCoef(param.traitement[3]) * Utils.parseInt(fct.traitement[3])
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
	 * parse les valeurs int
	 * @param  {[string]} value
	 * @return {[int]}
	 */
	static parseInt(value){
		let parsed = parseInt(value,10);

		if(isNaN(parsed)){
			return 0;
		}

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

	static getGlobalWorkflow(){
		return [
			{label : 'Charges projetées', inner : [
				{ label : 'Spécification', percentage : 10, editable : false},
				{ label : 'Conception', percentage : 21, editable : false},
				{ label : 'Réalisation + TU', percentage : 47, editable : false},
				{ label : 'Intégration', percentage : 11, editable : false},
				{ label : 'Validation', percentage : 11, editable : false}
			]},
			{label : 'Charges connexes', inner : [
				{ label : 'Formation', percentage : null, editable : true},
				{ label : 'Support démarrage', percentage : null, editable : true},
				{ label : 'Installation sur site', percentage : null, editable : true},
				{ label : 'Documentation', percentage : 5, editable : false},
			]},
			{label : 'Charges transversales', inner : [
				{ label : "Maitrise d'oeuvre", percentage : 5, editable : false},
				{ label : "Encadrement des équipes", percentage : 7, editable : false},
				{ label : "Qualité", percentage : 5, editable : false},
			]},
		];
	}

	static getGlobalCost(state){
		const costs = state.functions.byId.map(fnc => fnc.get('costs')).toList().toJS();
		const param = state.projects.get('costs').toJS();
		const cost = this.getFunctionsCost(costs,param)
		const project = state.projects;
		const connexeCosts = project.get('connexeCosts');


		let total =  0;
		const workflow = this.getGlobalWorkflow().map((item)=> {
			item["total"] = this.getSectionCost(item.inner,cost,connexeCosts)
			total += item["total"];
			return item;
		})

		const nbMonth = total / 20;
		let nbWeek = nbMonth *4.3;
		let minMonth = 2.5*Math.pow(nbMonth,1/3);
		let minWeek = minMonth*4.3;
		let optMonth = 1.4 * minMonth;
		let optWeek = optMonth  * 4.3;

		nbWeek = Math.ceil(nbWeek);
		minMonth = this.ceilDecimal(minMonth,1);
		minWeek = this.ceilDecimal(minWeek,1);
		optMonth = this.ceilDecimal(optMonth,1);
		optWeek = Math.ceil(optWeek);

		const delay = Math.ceil(project.get('parameters').get('delay') - minWeek);
		const complexite = project.get('parameters').get('complexite');
		const margeSecu = delay < 0 ? -delay : 0;

		const margeSecuDay = Math.ceil(total*margeSecu/100);
		const margeComplexDay = Math.ceil(total*complexite/100);

		const totalAfterMarge = total + margeSecuDay + margeComplexDay;

		return {
			cost,
			workflow,
			total,
			connexeCosts,
			nbMonth,
			nbWeek,
			minMonth,
			minWeek,
			optMonth,
			optWeek,
			project,
			margeSecu,
			margeSecuDay,
			margeComplexDay ,
			totalAfterMarge
		};
	}
}

export default Utils;
