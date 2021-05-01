var roleUpgraderUsingContainer = {

    run: function (creep, source, workFlag) {
        /*//sign
        if(creep.room.controller) {
            if(creep.signController(creep.room.controller, "物競，天擇，效實，儲能") == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }*/
        if (!creep.pos.isEqualTo(workFlag)) {
            creep.moveTo(workFlag, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if (creep.memory.upgrading) {
                if (creep.memory.repairing && source.hits < source.hitsMax) {
                    creep.repair(source);
                    return;
                } else {
                    if (Math.random() > 0.5) {
                        creep.upgradeController(creep.room.controller);
                    } else {
                        var road = creep.pos.lookFor(LOOK_STRUCTURES).filter(
                            object => object.structureType == STRUCTURE_ROAD
                        )[0];
                        if (road && road.hits < road.hitsMax) {
                            creep.repair(road);
                        } else {
                            creep.upgradeController(creep.room.controller);
                        }
                    }
                }
                creep.memory.repairing = source.hits < source.hitsMax - 1000;
            }
            else {
                creep.withdraw(source, RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleUpgraderUsingContainer;