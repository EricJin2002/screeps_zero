var roleHarvester = require('role.harvesterV2');
var roleBuilder = {

    run: function (creep, source, idealStructureTypes, restFlagIfHarvester = creep.room.find(FIND_FLAGS)[1]) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var errType = creep.build(Game.getObjectById(creep.memory.construction));
            if (errType == ERR_INVALID_TARGET) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                targets.sort((a, b) => a.progressTotal - b.progressTotal);
                if (targets.length) {
                    creep.memory.construction = targets[0].id;
                } else {
                    roleHarvester.run(creep, source, idealStructureTypes, restFlagIfHarvester);

                }
            } else if (errType == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.construction), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;