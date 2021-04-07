var roleCarrier = {

    run: function (creep, from, to, types, restFlag = Game.flags.Pick1) {
        if (creep.store.getFreeCapacity() > 0 && !creep.memory.transfering) {
            for (sourceIndex in types) {
                if (to.store.getFreeCapacity(types[sourceIndex]) > 100 &&
                    from.store.getUsedCapacity(types[sourceIndex]) > 100 &&
                    creep.withdraw(from, types[sourceIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(from, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else if (creep.store.getUsedCapacity() > 0) {
            for (sourceIndex in types) {
                if (creep.store.getUsedCapacity(types[sourceIndex]) > 0 &&
                    creep.transfer(to, types[sourceIndex]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            creep.memory.transfering = creep.store.getUsedCapacity() > 0;
        } else {
            creep.memory.transfering = creep.store.getUsedCapacity() > 0;
            creep.moveTo(restFlag);
        }
    }
};

module.exports = roleCarrier;