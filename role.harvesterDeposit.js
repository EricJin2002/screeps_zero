var roleHarvesterDeposit = {

    run: function (creep, lab, homeRoomIndex, passRoomIndex, targetRoomIndex, target) {
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
                if (creep.room.name != homeRoomIndex) {
                    if (creep.room.name == passRoomIndex) {
                        creep.memory.pass = true;
                    }
                    if (creep.memory.pass != true) {
                        var exitDir1 = creep.room.findExitTo(passRoomIndex);
                    } else {
                        var exitDir1 = creep.room.findExitTo(homeRoomIndex);
                    }
                    var exit1 = creep.pos.findClosestByRange(exitDir1);
                    creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    creep.memory.pass = false;
                    for (const resourceType in creep.store) {
                        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            } else {
                if (creep.room.name != targetRoomIndex) {
                    if (creep.room.name == passRoomIndex) {
                        creep.memory.pass = true;
                    }
                    if (creep.memory.pass != true) {
                        var exitDir1 = creep.room.findExitTo(passRoomIndex);
                    } else {
                        var exitDir1 = creep.room.findExitTo(targetRoomIndex);
                    }
                    var exit1 = creep.pos.findClosestByRange(exitDir1);
                    creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    creep.memory.pass = false;
                    var source = creep.room.find(FIND_DEPOSITS)[0];
                    if (!source) {
                        source = creep.room.find(FIND_SOURCES_ACTIVE)[0];
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

module.exports = roleHarvesterDeposit;