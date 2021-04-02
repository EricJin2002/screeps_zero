var roleUrgentShifter = {

    run: function (creep, idealStructureTypes, idealStructure = null) {//idealStructure's priority higher than idealStructureTypes
        if (creep.store.getFreeCapacity() > 0) {
            var source = creep.room.storage;
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var target = idealStructure;
            if (!target) {
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return idealStructureTypes.includes(structure.structureType) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        /*     (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER)*/
                    }
                });
            }
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.moveTo(creep.room.find(FIND_FLAGS)[3]);
            }
        }
    }
};

module.exports = roleUrgentShifter;