
/**
 * Componet Class
 */
class Component{
    /**
     * Represents a Component
     * @constructor
     */
    constructor(id,netlist){
        this.id = id;
        this.netlist = netlist;
    }
}

/**
 * Nmos Class
 */
class Nmos extends Component {
    /**
     * Represents a Nmos
     * @constructor
     */
    constructor(jsonObj){
        super(jsonObj["id"],jsonObj["netlist"]);
        this.ml = jsonObj["m(l)"]; 
    }

    /**
     * Act as a getter of the object data in a JSON format.
     * @returns {JSON} - Object Data
     */
    getJSON() {
        var data = {};
        data['type']= "nmos";
        data['id'] = this.id;
        data['m(l)'] = this.ml;
        data['netlist'] = this.netlist;
        return data;
     }
}

/**
 * Resistor Class
 */
class Resistor extends Component{
    /**
     * Represents a Resistor
     * @constructor
     */
    constructor(jsonObj){
        super(jsonObj["id"],jsonObj["netlist"]);
        this.resistance = jsonObj["resistance"];
    }

    /**
     * Act as a getter of the object data in a JSON format.
     * @returns {JSON} - Object Data
     */
    getJSON() {
       var data = {};
       data['type'] = "resistor";
       data['id'] = this.id;
       data['resistance'] = this.resistance;
       data['netlist'] = this.netlist;
       return data;
    }
}

module.exports = {
    Component : Component,
    Nmos  : Nmos,
    Resistor : Resistor
}