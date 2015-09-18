class Dispatcher {  

    constructor() { 
    	console.log('Dispatcher creation');
    }

    bindListener(listener) {
    	console.log('binding listener')
    	this.listener = listener;
    }

    error(message) {
    	console.log('dispatch error')
    	this.listener.error(message);
    }

    warn(message) {
    	this.listener.warn(message);
    }

    info(message) {
    	this.listener.warn(message);
    }

}

module.exports = new Dispatcher();