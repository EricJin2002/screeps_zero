var roleProcessor2 = {

    run: function (creep, linkSelf,/* linkUpgrade,*/ linkHarvest) {
        if (!creep.pos.isEqualTo(Game.flags.Proc2)) {
            creep.moveTo(Game.flags.Proc2, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (creep.room.terminal.store.getUsedCapacity([RESOURCE_ENERGY]) < 100000) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    if (creep.withdraw(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    }
                }
            } else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                creep.withdraw(linkSelf, RESOURCE_ENERGY);
            }
            linkHarvest.transferEnergy(linkSelf);
        }
    }
}

module.exports = roleProcessor2;