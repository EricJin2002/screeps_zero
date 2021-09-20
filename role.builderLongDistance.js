var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleBuilderLongDistance = {

    run: function (creep, homeRoomIndex, targetRoomIndex, source, idealStructureTypes, restFlagIfHarvester = null) {
        if (creep.room.name != targetRoomIndex) {
            const exitDir = creep.room.findExitTo(targetRoomIndex);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else if (creep.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            roleBuilder.run(creep, source, idealStructureTypes, restFlagIfHarvester);
        } else {
            roleUpgrader.run(creep, source);
        }
    }
};

module.exports = roleBuilderLongDistance;