const API = require('./modules/API').API
const util = require('util')


API.readJSON("./Topology Files/topology1.json")
API.readJSON("./Topology Files/topology2.json")
API.readJSON("./Topology Files/topology3.json")
console.log(API.writeJSON("top1"));
API.deleteTopology("top1")
API.deleteTopology("top2")
console.log(util.inspect(API.queryTopologies(), {showHidden: false, depth: null, colors: true}))
console.log(API.queryDevices("top3"));
console.log(API.queryDevicesWithNetlistNode("top3","n1"))
