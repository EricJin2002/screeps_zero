var roleClaimerFlag = {
    run: function (creep, homeRoomIndex, flag, targetRoomIndex) {
        if (creep.room.name != targetRoomIndex) {
            if (creep.pos.isEqualTo(flag)) {
                creep.memory.pass = true;
            }
            if (creep.memory.pass != true) {
                creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffaa00' } })
            } else {
                //creep.move(LEFT);
                var exitDir1 = creep.room.findExitTo(targetRoomIndex);
                var exit1 = creep.pos.findClosestByRange(exitDir1, { filter: (t) => t.y > 20 });
                creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            if(creep.reserveController(creep.room.controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
            if (!creep.memory.claimed && creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                } else {
                    creep.memory.claimed = true;
                }
            } else {
                //sign
                if(creep.room.controller) {
                    if(creep.signController(creep.room.controller, '物競，天擇，效實，儲能 from E29N55') == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
}
module.exports = roleClaimerFlag;