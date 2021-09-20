var roleInvader = {

    run: function (creep, homeRoomIndex, targetRoomIndex) {
        if (creep.room.name != targetRoomIndex) {
            const exitDir = creep.room.findExitTo(targetRoomIndex);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else if (true) {
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (t) => t.structureType != STRUCTURE_CONTROLLER &&
                        t.structureType != STRUCTURE_SPAWN &&
                        t.structureType != STRUCTURE_WALL
                        //t.structureType != STRUCTURE_EXTENSION
                });
                //target = Game.getObjectById('5fcc92ffe051e63cc3a4a44f');
                if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                if (!target) {
                    if (creep.room.controller) {
                        if (creep.signController(creep.room.controller, '物競，天擇，效實，儲能') == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleInvader;