var roleClaimer = {
    run: function (creep, homeRoomIndex, targetRoomIndex) {
        if (creep.room.name != targetRoomIndex) {
            const exitDir = creep.room.findExitTo(targetRoomIndex);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            if (!creep.memory.claimed && creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                } else {
                    creep.memory.claimed = true;
                }
            } else {
                //sign
                if(creep.room.controller) {
                    if(creep.signController(creep.room.controller, '物競，天擇，效實，儲能') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
}
module.exports = roleClaimer;