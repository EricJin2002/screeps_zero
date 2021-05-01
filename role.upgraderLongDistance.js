var roleUpgraderLongDistance = {

    run: function (creep, homeRoomIndex, targetRoomIndex, target) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            if (creep.room.name != targetRoomIndex) {
                const exitDir = creep.room.findExitTo(targetRoomIndex);
                const exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store.getUsedCapacity() > 0
                    }
                });
                if (sources.length) {
                    if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                } else {
                    sources = creep.room.find(FIND_SOURCES_ACTIVE);
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    }
};

module.exports = roleUpgraderLongDistance;