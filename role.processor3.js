var roleProcessor3 = {

    run: function (creep, linkSelf,/* linkUpgrade,*/ linkHarvest) {
        if (!creep.pos.isEqualTo(Game.flags.Proc3)) {
            creep.moveTo(Game.flags.Proc3, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                linkSelf.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
                creep.withdraw(linkSelf, RESOURCE_ENERGY);
            }
        }
        linkHarvest.transferEnergy(linkSelf);
    }
}

module.exports = roleProcessor3;