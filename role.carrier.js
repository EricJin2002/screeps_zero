var roleCarrier = {

    run: function (creep, from, to, types, restFlag = Game.flags.Pick1) {
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.errType = OK;
            for (sourceIndex in types) {
                if (to.store.getFreeCapacity(types[sourceIndex]) > 0 &&
                    from.store.getUsedCapacity(types[sourceIndex]) > 0 &&
                    creep.withdraw(from, types[sourceIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(from, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else if (creep.store.getUsedCapacity() > 0) {
            for (sourceIndex in types) {
                if (creep.store.getUsedCapacity(types[sourceIndex]) > 0) {
                    var errType = creep.transfer(to, types[sourceIndex]);
                    if (errType == ERR_FULL || creep.memory.errType == ERR_FULL) {
                        creep.memory.errType = ERR_FULL;
                        if (creep.transfer(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(from, { visualizePathStyle: { stroke: '#ffffff' } });
                        } else {
                            for (const resourceType in creep.store) {
                                creep.transfer(creep.room.storage, resourceType);
                            }
                        }
                    } else if (errType == ERR_NOT_IN_RANGE) {
                        creep.moveTo(to, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                    return;
                }
            }
        }
    }
};

module.exports = roleCarrier;