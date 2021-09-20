var invadeAttacker = {

    run: function (creep, homeRoomIndex, targetRoomIndex) {

        if (creep.memory.iscreepHeal != true) {
            var targets = creep.room.find(FIND_MY_CREEPS, {
                filter:
                    (target) => target.memory.role == 'invade_attacker_heal'
            });
            if (targets.length) {
                creep.memory.creepHealID = targets[0].id;
                creep.memory.iscreepHeal = true;
            }
        }
        if (creep.memory.iscreepHeal == true) {
            var creepHeal = Game.getObjectById(creep.memory.creepHealID);

            var skip = false;
            if (creepHeal && creepHeal.move(creep) == ERR_NOT_IN_RANGE) {
                creepHeal.moveTo(creep);
                skip = true;
            }
            if (creepHeal) {
                creepHeal.heal(creepHeal.hits < creep.his ? creepHeal : creep);
            }

            if (!skip || creep.pos.x == 0 ||
                creep.pos.y == 0 ||
                creep.pos.x == 49 ||
                creep.pos.y == 49) {

                if (creep.room.name != targetRoomIndex) {
                    const exitDir = creep.room.findExitTo(targetRoomIndex);
                    const exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(exit, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else if (true) {
                    //var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                        filter: (t) => t.structureType == STRUCTURE_SPAWN
                    });
                    if (target) {
                        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    } else {
                        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (t) => t.structureType != STRUCTURE_CONTROLLER &&
                                t.structureType != STRUCTURE_SPAWN &&
                                t.structureType != STRUCTURE_WALL &&
                                t.structureType != STRUCTURE_ROAD &&
                                t.structureType != STRUCTURE_CONTAINER &&
                                t.structureType != STRUCTURE_STORAGE
                            //t.structureType != STRUCTURE_EXTENSION
                        });
                        //target = Game.getObjectById('5fcc92ffe051e63cc3a4a44f');
                        if (target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                        if (!target) {
                            if (creep.room.controller) {
                                if (creep.signController(creep.room.controller, '物競，天擇，效實，儲能') == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(creep.room.controller);
                                }
                            }
                        }
                    }
                }
            }
        }

    }
};

module.exports = invadeAttacker;