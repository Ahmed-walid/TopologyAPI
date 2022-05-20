const Component = require('./Component.js')

/**
 * Topology Class
 */

class Topology {

    id;
    components = [];

     /**
     * Represents a Topology
     * @constructor
     */
    constructor(jsonObj){
        try{
            this.id  = jsonObj["id"];
            for (var componentJson of jsonObj["components"]){
                if(componentJson["type"]=="resistor")
                    this.components.push(new Component.Resistor(componentJson));
                else if(componentJson["type"]=="nmos")
                    this.components.push(new Component.Nmos(componentJson));
            }
        }
        catch(error){
            console.log(error);
        }
    }

    /**
     * Act as a getter of the topology components.
     * @returns {List} - Components list.
     */
    getComponents(){
        return this.components;
    }

    /**
     * Returns Topology data formated in JSON
     * @returns {JSON} - Topology data formated in JSON
     */
    getJSON(){

        var data = {};
        data["id"] = this.id;
        data["components"] = [];
        for(var component of this.components){
            data["components"].push(component.getJSON());
        }
        return data;
    }

    
}

module.exports = {
    Topology : Topology
}