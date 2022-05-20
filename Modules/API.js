var fs = require('fs');
const Component = require('./Component.js');
const Topology =  require('./Topology.js')

/**
 * Topology API Class
 */

class API {

    static #topologies = [];

    /**
    * Read JSON file fot topology from the disk and add the topology object to the #topologies array.
    * @param {string} filename - filename of the topology to read.
    * @returns {Boolean} - True in case of success and false otherwise.
    */  
    static readJSON(filename) {
        try{
        const topologyFile = fs.readFileSync(filename, { encoding: 'utf8' });
        const topologyJSON =  JSON.parse(topologyFile);
        if(this.getTopology(topologyJSON["id"])!=null)   //Already exist
            return false;
        const newTopology = new Topology.Topology(topologyJSON)
        this.#topologies.push(newTopology);
        return true;
        }
        catch(error){
            console.log(`Error while reading file ${filename}`)
            return false;
        }
    };

    /**
    * Write JSON contains data about a certain topology.
    * @param {string} ID - ID of the topology to write.
    * @returns {Boolean} - True in case of success and False otherwise.
    */  
    static writeJSON(topologyID){
        const topology = this.getTopology(topologyID);
        if(!topology)
            return false
        try{
            const topologyJSON = topology.getJSON();
            fs.writeFileSync(`./Outputs/${topologyID}.json`, JSON.stringify(topologyJSON,null, "\t"));
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
    

    /**
    * A getter for current stored topology objects.
    * @returns {List} - List of all current topologies
    */  
    static queryTopologies(){
        let tops = this.#topologies.map((top)=>top.getJSON());
        return tops;
    }

 
    /**
    * Make a query about componets in a certain topology.
    * @param {string} ID - ID of the targeted topology.
    * @returns {List} - List of devices in topology with ID
    */  
    static queryDevices(ID){
        const topology =  this.getTopology(ID);
        if(topology==null)
            return null;
        
        return topology.getComponents().map((comp)=>comp.getJSON());
    }


    /**
    * Make a query about componets in a certain topology connected to a certain node.
    * @param {string} ID - ID of a topology to be deleted.
    * @param {string} node - the node the devices are connected to. 
    * @returns {List} - List of devices connect to node
    */  
    static queryDevicesWithNetlistNode(ID,node){
       let topologyComponents=  this.queryDevices(ID);
       if(!topologyComponents)
            return null;
            
        return topologyComponents.filter((component) => Object.values(component["netlist"]).includes(node));
    }
    

   /**
     * Makes a query about componets in a certain topology connected to a node.
     * @param {string} ID - ID of a topology to be deleted.
     * @returns {JSON} - Topology Object
     */
    static getTopology(ID){
        const found = this.#topologies.find(topology => topology["id"] == ID);
        if(!found)
            return null
        return found
    }
    
    /**
     * Deletes a certain topology with {ID}.
     * @param {string} ID - ID of a topology to be deleted.
     * @returns {Boolean} - True in case of success and False otherwise.
     */
    static deleteTopology(ID){
        const index = this.#topologies.findIndex(topology => topology["id"] == ID);
        if(index==-1)
            return false;
        this.#topologies.splice(index,1);
        return true;
    }

}

module.exports = {
   API:API
}