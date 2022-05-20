const API = require('../modules/API').API


// Test Objects:

let top1 = {
    "id": "top1",
    "components": [
      {
        "type": "resistor",
        "id": "res1",
        "resistance": {
          "default": 100,
          "min": 10,
          "max": 1000
        },
        "netlist": {
          "t1": "vdd",
          "t2": "n1"
        }
      },
      {
        "type": "nmos",
        "id": "m1",
        "m(l)": {
          "default": 1.5,
          "min": 1,
          "max": 2
        },
        "netlist": {
          "drain": "n1",
          "gate": "vin",
          "source": "vss"
        }
      }
    ]
  };

//ReadJson Tests:

test('Test Read JSON File', () =>{
    expect(API.readJSON('./Topology Files/topology2.json')).toBe(true);
});

test('Test Read Alreay stored Topology', () =>{
  expect(API.readJSON('./Topology Files/topology2.json')).toBe(false);
});

test('Test Read Wrong JSON File', () =>{
  expect(API.readJSON('./Topology Files/WrongFile.json')).toBe(false);
})


//Query Topologies Test:

API.readJSON('./Topology Files/topology1.json');

test('Test Query last Added Topology', () =>{
  expect(API.queryTopologies()[0]).toStrictEqual(top1);
})

test('Test Query Number Of Topolgies', () =>{
  expect(API.queryTopologies().length).toBe(2);
})

// writeJSON Test:

test('Test writeJSON of existent topology', () =>{
  expect(API.writeJSON("top2")).toBe(true);
})

test('Test writeJSON of non-existent topology', () =>{
  expect(API.writeJSON("top4")).toBe(false);
})


//Query Devices Test:

const devices = [
  {
    type: 'resistor',
    id: 'res2',
    resistance: { default: 100, min: 10, max: 1000 },
    netlist: { t1: 'vdd', t2: 'n1' }
  },
  {
    type: 'nmos',
    id: 'm2',
    'm(l)': { default: 1.5, min: 1.5, max: 2.5 },
    netlist: { drain: 'n2', gate: 'vin', source: 'vss' }
  }
];

test('Test Query Devices - existent topology', () =>{
  expect(API.queryDevices("top2")).toStrictEqual(devices);
})

test('Test Query Devices - non-existent topology ', () =>{
  expect(API.queryDevices("top4")).toBe(null);
})


//Query Devices with Netlist Node

const devicesConnectedAtNode = [
  {
    type: 'resistor',
    id: 'res1',
    resistance: { default: 100, min: 10, max: 1000 },
    netlist: { t1: 'vdd', t2: 'n1' }
  },
  {
    type: 'nmos',
    id: 'm1',
    'm(l)': { default: 1.5, min: 1, max: 2 },
    netlist: { drain: 'n1', gate: 'vin', source: 'vss' }
  }
];
test('Test Query Devices with Netlist Node', () =>{
  expect(API.queryDevicesWithNetlistNode("top1","n1")).toStrictEqual(devicesConnectedAtNode);
})

test('Test Query Devices with Netlist Node - imaginary node', () =>{
  expect(API.queryDevicesWithNetlistNode("top1","x-node")).toStrictEqual([]);
})

test('Test Query Devices with Netlist Node - imaginary Topology', () =>{
  expect(API.queryDevicesWithNetlistNode("topx","n1")).toStrictEqual(null);
})


// Delete Topology Tests:

test('Test Delete Topology', () =>{
  expect(API.deleteTopology("top2")).toStrictEqual(true);
})

test('Test Delete Topology - Checking Topologies After Deletion', () =>{
  expect(API.queryTopologies()[0]).toStrictEqual(top1);
})

test('Test Delete Topology - Deletion Of imagniary Topology', () =>{
  expect(API.deleteTopology("top2")).toStrictEqual(false);
})
