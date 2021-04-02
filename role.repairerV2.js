var roleWithdrawer = require('role.withdrawer');
var roleRepairer = {

    run: function (creep, repairTargetIDs, restFlag = creep.room.find(FIND_FLAGS)[3]) {
        if (creep.getActiveBodyparts(WORK) == 0) {//if damaged by invaders
            roleWithdrawer.run(creep);
        } else {
            if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.repairing = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
                creep.memory.repairing = true;
                creep.say('🚧 repair');
            }

            if (creep.memory.repairing) {
                //sort by urgency 
                var targets = Array();
                for (var index in repairTargetIDs) {
                    if (Game.getObjectById(repairTargetIDs[index]).hits <
                        Game.getObjectById(repairTargetIDs[index]).hitsMax
                    ) {
                        targets.push(Game.getObjectById(repairTargetIDs[index]));
                    }
                }
                //targets.filter(object => object.hits < object.hitsMax);
                targets.sort((a, b) => a.hits - b.hits);
                if (!creep.memory.resting && targets.length > 0) {
                    var target = targets[0];
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                } else {
                    creep.moveTo(restFlag);
                    if (targets.length > 0)
                        creep.memory.resting = (targets[0].hits > targets[0].hitsMax - 10000);
                    else
                        creep.memory.resting = true;
                }
            } else {
                if (creep.room.storage.store.getUsedCapacity([RESOURCE_ENERGY]) > 20000) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffaa00' } });
                    } else {
                        creep.moveTo(restFlag);
                    }
                }
            }
        }
    }
};

module.exports = roleRepairer;