var roleHealer = {

    run: function (creep, homeRoomIndex, targetRoomIndex) {
        if (creep.room.name != targetRoomIndex) {
            const exitDir = creep.room.findExitTo(targetRoomIndex);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else if (false) {
            //target = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            //target = Game.getObjectById('5fcc92ffe051e63cc3a4a44f');
            //if (target && creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
            //}
            const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            if(target) {
                if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else if (true) {
            if (creep.room.controller && !creep.room.controller.my) {
                //console.log(creep.attackController(creep.room.controller));
                var errType = creep.attackController(creep.room.controller);
                if(errType == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                } else if (errType == ERR_INVALID_TARGET) {
                    creep.claimController(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleHealer;