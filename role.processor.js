var roleProcessor = {

    run: function (creep, linkSelf, linkUpgrade, linkHarvest) {
        if (!creep.pos.isEqualTo(Game.flags.Proc1)) {
            creep.moveTo(Game.flags.Proc1, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (linkHarvest.store[RESOURCE_ENERGY] < 200 && linkUpgrade.store[RESOURCE_ENERGY] < 400) {
                if (creep.transfer(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                    creep.room.storage.store[RESOURCE_ENERGY] > 40000) {
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                }
                linkSelf.transferEnergy(linkUpgrade);
            } else {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(linkSelf, RESOURCE_ENERGY);
                }
            }
            if (linkUpgrade.store[RESOURCE_ENERGY] < 600) {
                linkHarvest.transferEnergy(linkUpgrade);
            } else {
                linkHarvest.transferEnergy(linkSelf);
            }
        }
    }
}

module.exports = roleProcessor;