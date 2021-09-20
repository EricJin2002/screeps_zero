var roleTransferer = {

    run: function (creep, from, to, idealStructureTypes = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION], restFlag = null) {

        if (creep.memory.transfering && creep.store.getUsedCapacity() == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0) {
            creep.memory.transfering = true;
            creep.say('🚧 transfer');
        }

        if (creep.memory.transfering) {
            if (creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
                if (creep.transfer(to, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return idealStructureTypes.includes(structure.structureType) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else {
            if (from.store.getUsedCapacity(RESOURCE_ENERGY) > 200) {
                if (creep.withdraw(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(from, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else if (creep.room.energyAvailable != creep.room.energyCapacityAvailable) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter:
                        (t) => ((t.structureType == STRUCTURE_CONTAINER || t.structureType == STRUCTURE_STORAGE) &&
                            t.store.getUsedCapacity(RESOURCE_ENERGY) > 200)
                });
                if (target) {
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                } else if (restFlag) {
                    creep.moveTo(restFlag, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else if (restFlag) {
                creep.moveTo(restFlag, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}

module.exports = roleTransferer;