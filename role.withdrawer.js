var roleUrgentShifter = require('role.urgentShifter');
var roleWithdrawer = {

    run: function (creep, restFlag = creep.room.find(FIND_FLAGS)[3]) {
        var target = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
            filter: (tombstone) => !tombstone.creep.my && tombstone.store.getUsedCapacity() > 0
        });
        if(target) console.log('find hostile tombstone at (', target.pos.x, ',', target.pos.y, ')');
        if (!target && !creep.memory.transfering) {
            //shift energy from storage if urgency
            if (creep.room.energyAvailable <= 800) {
                roleUrgentShifter.run(creep, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]);
                return;
            }

            target = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (tombstone) => tombstone.store.getUsedCapacity() > 0
            });
            //if(target) console.log('find tombstone at (', target.pos.x, ',', target.pos.y, ')');
        }
        if (creep.store.getFreeCapacity() > 0 && !creep.memory.transfering &&
            target && target.store.getUsedCapacity() > 0) {
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            for (const resourceType in target.store) {
                if (resourceType != RESOURCE_ENERGY) {
                    if (creep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else if (creep.store.getUsedCapacity() > 0) {
            for (const resourceType in creep.store) {
                if (creep.transfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            creep.memory.transfering = creep.store.getUsedCapacity() > 0;
        } else {
            creep.memory.transfering = creep.store.getUsedCapacity() > 0;
            creep.moveTo(restFlag);
        }
    }
};

module.exports = roleWithdrawer;

