var roleHarvesterLongDistance = {

    run: function (creep, lab, homeRoomIndex, targetRoomIndex, target) {
        if (!creep.memory.boost && lab && lab.store[RESOURCE_ENERGY] > 500 && lab.store[RESOURCE_KEANIUM_HYDRIDE] > 500) {
            if (lab.boostCreep(creep) == ERR_NOT_IN_RANGE || lab.boostCreep(creep) == ERR_INVALID_TARGET) {
                creep.moveTo(lab, { visualizePathStyle: { stroke: '#66ccff' } });
            } else {
                creep.memory.boost = true;
            }
        } else {
            if (creep.memory.upgrading && creep.store.getUsedCapacity() == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄');
            }
            if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
                creep.say('⚡');
            }
            if (creep.memory.upgrading) {
                //if (creep.room.name != homeRoomIndex) {
                /*
                if (creep.room.name == targetRoomIndex && !creep.pos.isEqualTo(Game.flags.Go1)) {
                    creep.moveTo(Game.flags.Go1, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {*/
                //        var exitDir2 = creep.room.findExitTo(homeRoomIndex);
                //        var exit2 = creep.pos.findClosestByRange(exitDir2);
                //        creep.moveTo(exit2, { visualizePathStyle: { stroke: '#ffaa00' } });
                //}
                //} else {
                /*
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }*/
                for (const resourceType in creep.store) {
                    if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
                //}
            } else {
                if (creep.room.name != targetRoomIndex) {
                    var exitDir1 = creep.room.findExitTo(targetRoomIndex);
                    var exit1 = creep.pos.findClosestByRange(exitDir1);
                    creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    var source = creep.room.find(FIND_DEPOSITS)[0];
                    if (!source) {
                        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                        source = creep.room.find(FIND_SOURCES_ACTIVE)[sources.length > 1 ? 1 : 0];
                    }
                    if (source) {
                        //console.log(creep.harvest(source));
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvesterLongDistance;