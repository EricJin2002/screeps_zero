var roleBuilder = require('role.builder');
var roleBuilderLongDistance = {

    run: function (creep, homeRoomIndex, targetRoomIndex, source, idealStructureTypes, restFlagIfHarvester = null) {
        if (creep.room.name != targetRoomIndex) {
            const exitDir = creep.room.findExitTo(targetRoomIndex);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
        } else {
            roleBuilder.run(creep, source, idealStructureTypes, restFlagIfHarvester);
        }
    }
};

module.exports = roleBuilderLongDistance;