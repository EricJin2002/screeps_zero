const roomMemory = {
    initialize: () => {
        Game.rooms.E28N54.memory = {
            numForEachType: {

                'claimer01': 1,
                'claimer11': 0,
                'builderLD1': 0,
                'invader1': 1,
                'defender01': 1,
                'healer1': 0,//too expensive

                'carrierL01': 1,
                'harvesterM1': 1,
                'harvesterLD01': 0,
                'harvesterLD11': 2,
                'upgraderLD11': 2,
                'repairer01': 1,
                'repairer11': 1,
                'upgraderUL1': 1,
                'builder01': 0,
                'builder11': 1,
                'urgentShifter1': 0,
                'upgrader01': 0,
                'upgrader11': 1,
                'upgraderUC1': 0,
                'processor1': 1,
                'withdrawer1': 1,
                'harvesterT01': 1,
                'harvesterT11': 1,
                'harvester01': 2,
                'harvester11': 1
            },
            warTypes: ['upgrader01', 'upgrader11', 'upgraderUL1', 'urgentShifter1', 'processor1', 'withdrawer1', 'harvesterT01', 'harvesterT11', 'harvester01', 'harvester11'],
            roleForEachType: {

                'carrierL01': [MOVE, CARRY, MOVE, CARRY],
                'harvesterM1': [WORK, MOVE, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'harvesterLD01': [WORK, MOVE, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'harvesterLD11': [WORK, MOVE, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'upgraderLD11': [WORK, MOVE, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'repairer01': [MOVE, WORK, CARRY, MOVE],
                'repairer11': [WORK, CARRY, MOVE],
                'upgraderUL1': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
                'builder01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'builder11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'upgrader01': [MOVE, WORK, CARRY, MOVE],
                'upgrader11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'upgraderUC1': [WORK, WORK, WORK, CARRY, MOVE, MOVE],
                'processor1': [MOVE, CARRY],
                'withdrawer1': [MOVE, CARRY, MOVE, CARRY],
                'harvesterT01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'harvesterT11': [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'harvester01': [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
                'harvester11': [MOVE, WORK, CARRY, MOVE],

                'attacker1': [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK],
                'urgentShifter1': [MOVE, CARRY],
                'claimer01': [CLAIM, MOVE, CLAIM, MOVE],
                'claimer11': [CLAIM, MOVE, CLAIM, MOVE],
                'builderLD1': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE],
                'invader1': [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE],
                'defender01': [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE],
                //'healer1': [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE],
                'healer1': [CLAIM, CLAIM, MOVE, MOVE]

            },
            source0: Game.rooms['E28N54'].find(FIND_SOURCES)[0],
            source1: Game.rooms['E28N54'].find(FIND_SOURCES)[1],
            repairTargetIDs: [
                ['605e7b225734153db6bfe52e', '605e7b1f0db288c02a7fd218', '605eb934c5078bec4245e690', '605eb9376389e1d3fd4a4837', '605ec701b1432e75d6f16fe8'],
                ['6083ddfb8227a42563b6cc1d', '6060a36897b43ed29344c271', '6060a35ab20e44375d43b5f3', '6060a351573415256ec0b51f', '6060a357670d4bb48490c321', '6060a3651f5d1e0632d2c36d', '6060a5221ee4c10063d59524', '609e959ce33166772adfff3a', '609e968624bf64fc56115afb']
            ],
            extensions: Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            }),
            towers: ['605de601c2c8a559d4ee74a1', '605ff7eb7ed7b9da231972ef', '609c1fd1e0fde32f16898f42'],
            links: ['60607d7dcea495400d10beea', '606086e10db288023180a0cf', '6068687e2bb56182b9b8e056'],
            mineral: Game.spawns['Spawn1'].room.find(FIND_MINERALS)[0],
            labs: ['606be696d5ec7212ad842ceb', '606d65ef43efe504028fad9a', '606ca60b225c833fc17119c4'],
            factory: ['60833d87f52e0f79452a22fa'],

            iswar = false
        };
        Game.rooms.E28N54.memory.myEnergyStructures= [].concat(Game.rooms.E28N54.memoryextensions, Game.spawns['Spawn1']);

        Game.rooms.E29N55.memory = {
            numForEachType: {
                'invade_attacker': 0,
                'invade_attacker_heal': 0,

                'harvesterM2': 1,
                'processor2': 1,
                'builder02': 0,
                'builder12': 0,
                'urgentShifter2': 0,
                'upgrader02': 0,
                'upgrader12': 0,
                'harvesterT12': 0,
                'harvesterT02': 1,
                'upgraderUC2': 1,
                'harvester12': 0,
                'harvester02': 2,
                'harvester012': 0
            },
            warTypes: ['urgentShifter2', 'attacker2', 'processor2', 'upgrader02', 'upgrader12', 'harvesterT12', 'harvesterT02', 'upgraderUC2', 'harvester12', 'harvester02', 'harvester012'],
            roleForEachType: {

                'harvesterM2': [WORK, MOVE, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'processor2': [MOVE, CARRY],
                'builder02': [MOVE, WORK, CARRY, MOVE],
                'builder12': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'upgrader02': [MOVE, WORK, CARRY, MOVE],
                'upgrader12': [MOVE, WORK, CARRY, MOVE],
                'harvesterT12': [MOVE, WORK, CARRY, MOVE],
                'harvesterT02': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'upgraderUC2': [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                'harvester12': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'harvester02': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'harvester012': [MOVE, WORK, CARRY],

                'urgentShifter2': [MOVE, CARRY],
                'attacker2': [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK],

                'invade_attacker': [TOUGH, MOVE, TOUGH, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE],
                //'invade_attacker': [TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE],
                'invade_attacker_heal': [HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE]
            },

            source0: Game.rooms['E29N55'].find(FIND_SOURCES)[0],
            source1: Game.rooms['E29N55'].find(FIND_SOURCES)[1],
            extensions: Game.spawns['Spawn2'].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            }),
            towers: ['6066b5e65abcd7285285abea', '606c30f908f9f2d043cf7a1a', '609ff02e12997146108eecd2'],
            containers: ['6065c2d43bc5866af992aebd', '60a4c534aa08a583a8a7cceb', '60a51dc7eb6138af4bbca30a'],
            links: ['606edbbdf965dd7db39966a2', '606ec5e64d24f02c2325f0ef'],
            mineral: Game.spawns['Spawn2'].room.find(FIND_MINERALS)[0],

            numForEachType31: {
                'claimer2': 0,
                'builderLD2': 2,
                'harvesterUC12': 1,
                'transferer2': 1
            },
            warTypes31: ['harvesterUC12'],
            roleForEachType31: {
                'claimer2': [CLAIM, MOVE],
                'builderLD2': [WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE],
                'harvesterUC12': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
                'transferer2': [CARRY, CARRY, MOVE, CARRY, MOVE, CARRY]
            },

            iswar = false
        };
        Game.rooms.E29N55.memory.myEnergyStructures= [].concat(Game.rooms.E29N55.memory.extensions, Game.spawns['Spawn2'], Game.spawns['Spawn31']);

        Game.rooms.E28N53.memory = {
            numForEachType: {

                'claimer13': 0,
                'claimer03': 0,
                'invader3': 0,

                'harvesterM3': 1,
                'harvesterT03': 0,
                'builder13': 0,
                'urgentShifter3': 1,
                'upgrader03': 0,
                'upgraderUL3': 1,
                'upgrader13': 0,
                'harvester03': 1,
                'processor3': 1,
                'transferer3': 1,
                'harvester13': 1,
                'harvester013': 0

            },
            warTypes: ['urgentShifter3', 'attacker3', 'harvesterT03', 'upgrader03', 'upgraderUL3', 'upgrader13', 'harvester03', 'processor3', 'harvester13', 'harvester013'],
            roleForEachType: {

                'harvesterM3': [MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'urgentShifter3': [MOVE, CARRY],
                'attacker3': [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK],
                'harvesterT03': [MOVE, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'builder13': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'upgrader03': [MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE, MOVE, WORK, CARRY, MOVE],
                'upgraderUL3': [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY],
                'upgrader13': [MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY],
                'harvester03': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                'processor3': [CARRY, MOVE],
                'transferer3': [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE],
                'harvester13': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                'harvester013': [MOVE, WORK, CARRY],

                'claimer13': [CLAIM, MOVE, CLAIM],
                'claimer03': [CLAIM, MOVE, CLAIM],
                'invader3': [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, MOVE, MOVE]
            },

            source0: Game.rooms['E28N53'].find(FIND_SOURCES)[0],
            source1: Game.rooms['E28N53'].find(FIND_SOURCES)[1],
            extensions: Game.spawns['Spawn3'].room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            }),
            towers: ['607dca013769c567314492a3', '608ae401790582676446c35f'],
            containers: ['60a13839d9efd000de257a43', '60a14a7841668420f1491255'],
            links: ['608a694e86dff32107b37620', '608aa6bba7fccab9a243aa44', '609357221d1f9b5da6049e61'],
            mineral: Game.spawns['Spawn3'].room.find(FIND_MINERALS)[0],

            iswar = false
        };
        Game.rooms.E28N53.myEnergyStructures = [].concat(Game.rooms.E28N53.memory.extensions, Game.spawns['Spawn3']);

        Game.rooms.E31N53.memory = {
            numForEachType: {
                'harvesterT14': 1,
                'upgrader14': 0,
                'upgrader04': 4,
                'harvester14': 0,
                'harvester04': 2
            },
            roleForEachType: {
                'harvesterT14': [MOVE, WORK, CARRY, MOVE],
                'upgrader14': [MOVE, WORK, CARRY, MOVE],
                'upgrader04': [MOVE, WORK, CARRY, MOVE],
                'harvester14': [MOVE, WORK, CARRY, MOVE],
                'harvester04': [MOVE, WORK, CARRY, MOVE]
            },

            source0: Game.rooms['E31N53'].find(FIND_SOURCES)[0],
            source1: Game.rooms['E31N53'].find(FIND_SOURCES)[1],
            towers: ['60a62c6f8df61da5474133f2'],

            iswar = false
        };

    }
}

module.exports = roomMemory;