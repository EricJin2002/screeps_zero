var roleHarvesterLongDistance = {

    run: function (creep, homeRoomIndex, targetRoomIndex, target) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡');
        }
        if (creep.memory.upgrading) {
            if (creep.room.name != homeRoomIndex) {
                if (creep.room.name == targetRoomIndex && !creep.pos.isEqualTo(Game.flags.Go1)) {
                    creep.moveTo(Game.flags.Go1, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    var exitDir2 = creep.room.findExitTo(homeRoomIndex);
                    var exit2 = creep.pos.findClosestByRange(exitDir2);
                    creep.moveTo(exit2, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                /*
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }*/
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else {
            if (creep.room.name != targetRoomIndex) {
                var exitDir1 = creep.room.findExitTo(targetRoomIndex);
                var exit1 = creep.pos.findClosestByRange(exitDir1);
                creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                var source = creep.room.find(FIND_SOURCES)[0]
                //console.log(creep.harvest(source));
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
};

module.exports = roleHarvesterLongDistance;