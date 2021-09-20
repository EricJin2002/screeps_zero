var roleProcessor3 = {

    run: function (creep, linkSelf,/* linkUpgrade,*/ linkHarvest1, linkHarvest2) {
        if (!creep.pos.isEqualTo(Game.flags.Proc3)) {
            creep.moveTo(Game.flags.Proc3, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (creep.room.terminal.store.getFreeCapacity() > 1000 && creep.room.terminal.store.getUsedCapacity([RESOURCE_ENERGY]) < 100000) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    if (linkSelf.store.getUsedCapacity(RESOURCE_ENERGY) <= 400 ||
                        creep.withdraw(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    }
                }
            } else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                linkSelf.store.getUsedCapacity(RESOURCE_ENERGY) > 400) {
                creep.withdraw(linkSelf, RESOURCE_ENERGY);
            }
        }
        linkHarvest1.transferEnergy(linkSelf);
        linkHarvest2.transferEnergy(linkSelf);
    }
}

module.exports = roleProcessor3;