var roleUpgraderUsingLink = {

    run: function (creep, link, repairTargetIDs = ['6061f1e072d4f83cc1a8c45d', '6061f1e6c7c9e8540a8389fb']) {
        //sign
        /*if(creep.room.controller) {
            if(creep.signController(creep.room.controller, '物競，天擇，效實，儲能') == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }*/
        if (!creep.pos.isEqualTo(Game.flags.Upgrade1)) {
            creep.moveTo(Game.flags.Upgrade1, { visualizePathStyle: { stroke: '#ff0000' } });
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
                var targets = [Game.getObjectById(repairTargetIDs[0]), Game.getObjectById(repairTargetIDs[1])];
                (targets[0].hits < targets[0].hitsMax || targets[1].hits < targets[1].hitsMax) &&
                    Math.random() > 0.7 ?
                    creep.repair(targets[0].hits < targets[1].hits ? targets[0] : targets[1]) :
                    creep.upgradeController(creep.room.controller);
            }
            else {
                creep.withdraw(link, RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleUpgraderUsingLink;