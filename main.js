
const roleHarvester = require('role.harvesterV2');
const roleHarvesterTower = require('role.harvesterTower');
const roleUpgrader = require('role.upgrader');
const roleUpgraderUsingContainer = require('role.upgraderUsingContainer');
const roleUpgraderUsingLink = require('role.upgraderUsingLink');
const roleBuilder = require('role.builder');
const roleAttacker = require('role.attacker');
const roleWithdrawer = require('role.withdrawer');
const roleRepairer = require('role.repairerV2');
const roleUrgentShifter = require('role.urgentShifter');
const roleProcessor = require('role.processor');
const roleClaimer = require('role.claimer');
const roleBuilderLongDistance = require('role.builderLongDistance');
const roleInvader = require('role.invader');

//local at room1
var numForEachType1 = {
    'claimer1': 0,
    'builderLD1': 3,
    'invader1': 0,

    'repairer01': 1,
    'repairer11': 1,
    'upgraderUL1': 1,
    'builder01': 3,
    'builder11': 3,
    'urgentShifter1': 0,
    'upgrader01': 2,
    'upgrader11': 3,
    'upgraderUC1': 0,
    'processor1': 1,
    'withdrawer1': 1,
    'harvesterT01': 2,
    'harvesterT11': 1,
    'harvester01': 2,
    'harvester11': 2
}
const warTypes1 = ['upgrader01', 'upgrader11', 'upgraderUC1', 'harvesterT01', 'harvesterT11', 'harvester01', 'harvester11']
const roleForEachType1 = {

    'repairer01': [WORK, MOVE, MOVE, WORK, CARRY, MOVE],
    'repairer11': [WORK, MOVE, MOVE, WORK, CARRY, MOVE],
    'upgraderUL1': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
    'builder01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'builder11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'upgrader01': [MOVE, WORK, CARRY, MOVE],
    'upgrader11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'upgraderUC1': [WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'processor1': [MOVE, CARRY],
    'withdrawer1': [MOVE, CARRY, MOVE, CARRY],
    'harvesterT01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'harvesterT11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'harvester01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    'harvester11': [MOVE, WORK, CARRY, MOVE],

    'attacker1': [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK],
    'urgentShifter1': [MOVE, CARRY],
    'claimer1': [CLAIM, MOVE],
    'builderLD1': [MOVE, WORK, WORK, CARRY, MOVE, MOVE],
    'invader1': [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE]
}

const source01 = Game.rooms['E28N54'].find(FIND_SOURCES)[0];
const source11 = Game.rooms['E28N54'].find(FIND_SOURCES)[1];
const repairTargetIDs1 = [
    ['605e7b225734153db6bfe52e', '605e7b1f0db288c02a7fd218', '605eb934c5078bec4245e690', '605eb9376389e1d3fd4a4837', '605ec701b1432e75d6f16fe8'],
    ['6060a36897b43ed29344c271', '6060a35ab20e44375d43b5f3', '6060a351573415256ec0b51f', '6060a357670d4bb48490c321', '6060a3651f5d1e0632d2c36d', '6060a5221ee4c10063d59524']
];
const extensions1 = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION }
});
const myEnergyStructures1 = [].concat(extensions1, Game.spawns['Spawn1']);
const towers1 = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
    filter: (object) => object.structureType == STRUCTURE_TOWER
});
const linkIDs1 = ['60607d7dcea495400d10beea', '606086e10db288023180a0cf'];

//local at room2
var numForEachType2 = {

    'builder02': 0,
    'builder12': 2,
    'upgrader02': 3,
    'upgrader12': 3,
    'upgraderUC2': 1,
    'harvester12': 2,
    'harvester02': 2

}
const warTypes2 = ['upgrader02', 'upgrader12', 'upgraderUC2', 'harvester12', 'harvester02']
const roleForEachType2 = {

    'builder02': [MOVE, WORK, CARRY, MOVE],
    'builder12': [MOVE, WORK, CARRY, MOVE],
    'upgrader02': [MOVE, WORK, CARRY, MOVE],
    'upgrader12': [MOVE, WORK, CARRY, MOVE],
    'upgraderUC2': [WORK, WORK, WORK, WORK, CARRY, MOVE],
    'harvester12': [MOVE, WORK, CARRY, MOVE],
    'harvester02': [MOVE, WORK, CARRY, MOVE]

}

const source02 = Game.rooms['E29N55'].find(FIND_SOURCES)[0];
const source12 = Game.rooms['E29N55'].find(FIND_SOURCES)[1];

const extensions2 = Game.spawns['Spawn2'].room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_EXTENSION }
});
const myEnergyStructures2 = [].concat(extensions2, Game.spawns['Spawn2']);


//record
var attacksSinceLastChanged = 0;
var recordCounter = 0;
//war
var isWar1 = false;
var isWar2 = false;

module.exports.loop = function () {
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel()
    }

    //auto change env
    /*if (Game.rooms['E28N54'].storage) {
        numForEachType1['withdrawer'] = 1;
    }*/
    if (Object.keys(Game.creeps).length < 14) {
        Game.rooms['E28N54'].controller.activateSafeMode();
        numForEachType1['urgentShifter1'] = 1;
    }

    //record
    if (++recordCounter == 30 && (
        console.log('** Attaks since last changed: ' + attacksSinceLastChanged + ' **') ^
        console.log('** Energy in storage: ' + Game.rooms['E28N54'].storage.store[RESOURCE_ENERGY] + ' **') ^
        (recordCounter = 0)
    ));

    //cleanse the old
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    //room1
    {
        //tower01
        if (towers1.length) {
            var tower01 = towers1[0];
        }
        if (tower01) {//ifnot tower01 then surrender
            //attack the hostile
            var closestHostile = tower01.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: (target) => target.getActiveBodyparts(ATTACK) &&
                    target.pos.x != 0 &&
                    target.pos.x != 50 &&
                    target.pos.y != 0 &&
                    target.pos.y != 50
            });
            if (!closestHostile) {
                closestHostile = tower01.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: (target) =>
                        target.pos.x != 0 &&
                        target.pos.x != 50 &&
                        target.pos.y != 0 &&
                        target.pos.y != 50
                });
            }
            if (closestHostile) {
                console.log('IT IS WAR !!');
                if (!isWar1) attacksSinceLastChanged++;
                isWar1 = true;
                //spawn the attacker creep
                var type = 'attacker1';
                if (_.filter(Game.creeps, (creep) => creep.memory.role == type).length < 2/*numForEachType1[type]*/) {
                    var newName = type + '_' + Game.time;
                    //console.log('Spawning new ' + type + ': ' + newName);
                    Game.spawns['Spawn1'].spawnCreep(roleForEachType1[type], newName,
                        {
                            memory: { role: type },
                            energyStructures: myEnergyStructures1
                        });
                }
                type = 'urgentShifter1';
                if (_.filter(Game.creeps, (creep) => creep.memory.role == type).length < 1/*numForEachType1[type]*/) {
                    var newName = type + '_' + Game.time;
                    //console.log('Spawning new ' + type + ': ' + newName);
                    Game.spawns['Spawn1'].spawnCreep(roleForEachType1[type], newName,
                        {
                            memory: { role: type },
                            energyStructures: myEnergyStructures1
                        });
                }

                //tower01 attack
                for (var i in towers1) {
                    towers1[i].attack(closestHostile);
                }
            } else {
                isWar1 = false;
                //repair the damaged
                //sort by range
                /*var closestDamagedStructure = tower01.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower01.repair(closestDamagedStructure);
                }*/
                //sort by urgency (better)
                var damagedStructure = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax && (
                        object.hits < 1000000 ||
                        object.structureType == STRUCTURE_ROAD
                    )// && !(object.pos.x < 10 && object.structureType == STRUCTURE_WALL) //&& 
                    //  object.structureType != STRUCTURE_WALL //&&
                    //  object.structureType != STRUCTURE_RAMPART
                });
                damagedStructure.sort((a, b) => a.hits - b.hits);
                if (damagedStructure) {
                    //console.log('tower01 is repairing' + damagedStructure[0]);
                    towers1[1].repair(damagedStructure[0]);
                }
            }
        }

        //respawn
        for (var type in numForEachType1) {
            if ((!isWar1 || warTypes1.includes(type)) &&
                _.filter(Game.creeps, (creep) => creep.memory.role == type).length < numForEachType1[type]) {
                var newName = type + '_' + Game.time;
                //console.log('Spawning new ' + type + ': ' + newName);
                Game.spawns['Spawn1'].spawnCreep(roleForEachType1[type], newName,
                    {
                        memory: { role: type },
                        energyStructures: myEnergyStructures1
                    });
            }
        }
        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x,
                Game.spawns['Spawn1'].pos.y + 2,
                { align: 'center', opacity: 0.8 });
        }
        /*
            //It is strange that codes below must be put in the module.exports.loop or it'll go wrong (cooldown for links will not decrease automatically)
            const links = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_LINK }
            });
        */

    }

    //room2
    if (Game.spawns['Spawn2']) {
        /*
                const extensions2 = Game.spawns['Spawn2'].room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_EXTENSION }
                });
                const myEnergyStructures2 = [].concat(extensions2, Game.spawns['Spawn2']);
        */
        //respawn
        for (var type in numForEachType2) {
            if ((!isWar2 || warTypes2.includes(type)) &&
                _.filter(Game.creeps, (creep) => creep.memory.role == type).length < numForEachType2[type]) {
                var newName = type + '_' + Game.time;
                //console.log('Spawning new ' + type + ': ' + newName);
                Game.spawns['Spawn2'].spawnCreep(roleForEachType2[type], newName,
                    {
                        memory: { role: type },
                        energyStructures: myEnergyStructures2
                    });
            }
        }
        if (Game.spawns['Spawn2'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name];
            Game.spawns['Spawn2'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn2'].pos.x,
                Game.spawns['Spawn2'].pos.y + 2,
                { align: 'center', opacity: 0.8 });
        }
    }

    //creeps
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            //room1
            case 'harvester01': {
                roleHarvester.run(creep, source01,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'harvester11': {
                roleHarvester.run(creep, source11,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'upgrader01': {
                roleUpgrader.run(creep, source01); break;
            } case 'upgrader11': {
                roleUpgrader.run(creep, source11); break;
            } case 'upgraderUC1': {
                roleUpgraderUsingContainer.run(creep); break;
            } case 'upgraderUL1': {
                roleUpgraderUsingLink.run(creep, Game.getObjectById(linkIDs1[0])); break;
            } case 'builder01': {
                roleBuilder.run(creep, source01,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'builder11': {
                roleBuilder.run(creep, source11,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'harvesterT01': {
                if (towers1[1]) {
                    if (creep.memory.tower && towers1[1].store.getFreeCapacity([RESOURCE_ENERGY]) == 0) {
                        creep.memory.tower = false;
                        creep.say('🔄 harvestT_end');
                    }
                    if (!creep.memory.tower && towers1[1].store.getFreeCapacity([RESOURCE_ENERGY]) > 100) {
                        creep.memory.tower = true;
                        creep.say('⚡ harvestT_begin');
                    }
                    if (creep.memory.tower) {
                        roleHarvesterTower.run(creep, source01, towers1[1]); break;
                    }
                }
                roleHarvester.run(creep, source01,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'harvesterT11': {
                if (towers1[0]) {
                    if (creep.memory.tower && towers1[0].store.getFreeCapacity([RESOURCE_ENERGY]) == 0) {
                        creep.memory.tower = false;
                        creep.say('🔄 harvestT_end');
                    }
                    if (!creep.memory.tower && towers1[0].store.getFreeCapacity([RESOURCE_ENERGY]) > 100) {
                        creep.memory.tower = true;
                        creep.say('⚡ harvestT_begin');
                    }
                    if (creep.memory.tower) {
                        roleHarvesterTower.run(creep, source11, towers1[0]); break;
                    }
                }
                roleHarvester.run(creep, source11,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            } case 'attacker1': {
                roleAttacker.run(creep, Game.flags.Atk1); break;
            } case 'withdrawer1': {
                roleWithdrawer.run(creep, Game.flags.Pick1); break;
            } case 'repairer01': {
                roleRepairer.run(creep, repairTargetIDs1[0]); break;
            } case 'repairer11': {
                roleRepairer.run(creep, repairTargetIDs1[1]); break;
            } case 'urgentShifter1': {
                roleUrgentShifter.run(creep, [STRUCTURE_TOWER], towers1[0]); break;
            } case 'processor1': {
                roleProcessor.run(creep, Game.getObjectById(linkIDs1[1]), Game.getObjectById(linkIDs1[0])); break;
            } case 'claimer1': {
                roleClaimer.run(creep, 'E28N54', 'E29N55'); break;
            } case 'builderLD1': {
                roleBuilderLongDistance.run(creep, 'E28N54', 'E29N55', source02,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv2); break;
            } case 'invader1': {
                roleInvader.run(creep, 'E28N54', 'E29N54'); break;
            }
            //room2
            case 'harvester02': {
                roleHarvester.run(creep, source02,
                    [STRUCTURE_SPAWN, STRUCTURE_CONTAINER], Game.flags.Harv2); break;
            } case 'harvester12': {
                roleHarvester.run(creep, source12,
                    Game.spawns['Spawn2'].room.energyAvailable ==
                        Game.spawns['Spawn2'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv2); break;
            } case 'upgrader02': {
                roleUpgrader.run(creep, source02, Game.spawns['Spawn2'].room.controller, Game.spawns['Spawn2'].room.controller/*, Game.flags.Upgrade2*/); break;
            } case 'upgrader12': {
                roleUpgrader.run(creep, source12, Game.spawns['Spawn2'].room.controller, Game.spawns['Spawn2'].room.controller/*, Game.flags.Upgrade2*/); break;
            } case 'upgraderUC2': {
                roleUpgraderUsingContainer.run(creep, creep.pos.findClosestByRange(FIND_STRUCTURES,
                    { filter: (object) => object.structureType == STRUCTURE_CONTAINER }), Game.flags.Upgrade2); break;
            } case 'builder02': {
                roleBuilder.run(creep, source02,
                    [STRUCTURE_SPAWN, STRUCTURE_CONTAINER], Game.flags.Harv2); break;
            } case 'builder12': {
                roleBuilder.run(creep, source12,
                    Game.spawns['Spawn2'].room.energyAvailable ==
                        Game.spawns['Spawn2'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv2); break;
            }


            default: {
                roleHarvester.run(creep, source01,
                    Game.spawns['Spawn1'].room.energyAvailable ==
                        Game.spawns['Spawn1'].room.energyCapacityAvailable ?
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_STORAGE] :
                        [STRUCTURE_EXTENSION, STRUCTURE_SPAWN], Game.flags.Harv1); break;
            }
        }
    }
}