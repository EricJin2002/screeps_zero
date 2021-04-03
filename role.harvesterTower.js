var roleHarvesterTower = {

    run: function (creep, source, tower) {

        if (creep.memory.transferingTower && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferingTower = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.transferingTower && creep.store.getFreeCapacity() == 0) {
            creep.memory.transferingTower = true;
            creep.say('🚧 transfer');
        }

        if (creep.memory.transferingTower) {
            if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleHarvesterTower;