var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleBuilderLongDistanceFlag = {

    run: function (creep, homeRoomIndex, flag, targetRoomIndex, source, idealStructureTypes, onlyUpgrade, restFlagIfHarvester = null) {
        if (creep.room.name != targetRoomIndex) {
            if (creep.pos.isEqualTo(flag)) {
                creep.memory.pass = true;
            }
            if (creep.memory.pass != true) {
                creep.moveTo(flag, { visualizePathStyle: { stroke: '#ffaa00' } })
            } else {
                var exitDir1 = creep.room.findExitTo(targetRoomIndex);
                var exit1 = creep.pos.findClosestByRange(exitDir1, { filter: (t) => t.y > 20 });
                creep.moveTo(exit1, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else if (!onlyUpgrade && creep.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            roleBuilder.run(creep, source, idealStructureTypes, restFlagIfHarvester);
        } else {
            //roleBuilder.run(creep, source, idealStructureTypes, restFlagIfHarvester);
            roleUpgrader.run(creep, source);
        }
    }
};

module.exports = roleBuilderLongDistanceFlag;