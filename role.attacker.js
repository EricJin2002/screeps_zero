var roleAttacker = {

    run: function (creep, restFlag = creep.room.find(FIND_FLAGS)[2]) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(restFlag);
        }
    }
};

module.exports = roleAttacker;