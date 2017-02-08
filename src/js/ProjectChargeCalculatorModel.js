class ProjectChargeCalculatorModel{
	constructor(key){
		this.key = key;
		this.modules=Utils.store(key);
		this.onChanges=[];
	}

	subscribe(onChange){
		this.onChanges.push(onChange);
	}



	inform(){
		Utils.store(this.key,this.modules);
		this.onChanges.forEach((cb)=>cb());
	}

	addModule(){
		this.modules = this.modules.concat(new ProjectChargeCalculatorModuleModel());
		this.inform();
	}

	addFunction(moduleUuid){
		this.modules = this.module.map((module) =>{
			if(modules.uuid === moduleUuid){
				module.addFunction()
			}
			return module;
		});

		this.inform();
	}

	setFunctionIHMCost(moduleUuid,funcUuid,index,cost){
		this.modules = this.modules.map((module)=>{
			if(module.uuid === moduleUuid){
				module.setFunctionIHMCost(funcUuid,index,cost);
			}
			return module;
		});
		this.inform();
	}

	setFunctionIHMCost(moduleUuid,funcUuid,index,cost){
		this.modules = this.modules.map((module)=>{
			if(module.uuid === moduleUuid){
				module.setFunctionProcessCost(funcUuid,index,cost);
			}
			return module;
		});
		this.inform();
	}
}

class ProjectChargeCalculatorModuleModel{

	constructor(){
		this.uuid = Utils.uuid();
		this.label = "";
		this.functions = [];
	}

	inform(){
		Utils.store(this.key,this.modules);
		this.onChanges.forEach((cb)=>cb());
	}

	addFunction(){
		this.functions.concat(new ProjectChargeCalculatorFunctionModel());
	}

	setFunctionIHMCost(funcUuid,index,cost){
		this.functions = this.functions.map((func)=>{
			if(func.uuid = funcUuid){
				func.setIHMCost(index,cost);
			}
			return func;
		});
	}

	setFunctionProcessCost(funcUuid,index,cost){
		this.functions = this.functions.map((func)=>{
			if(func.uuid = funcUuid){
				func.setProcessCost(index,cost);
			}
			return func;
		});
	}
}

class ProjectChargeCalculatorFunctionModel{
	constructor(){
		var uuid = Utils.uuid();
		console.log("create : " + uuid)
		this.uuid = uuid;
		this.label = "";
		this.ihm = [0,0,0,0];
		this.process = [0,0,0,0];
	}

	setIHMCost(index, cost){
		this.ihm[index]=cost;
	}

	setProcessCost(index, cost){
		this.process[index]=cost;
	}
}

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
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
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
}
