var roleProcessor = {

    run: function (creep, linkSelf, linkUpgrade, linkHarvest, factory) {
        if (!creep.pos.isEqualTo(Game.flags.Proc1)) {
            creep.moveTo(Game.flags.Proc1, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN);
            if (linkHarvest.store[RESOURCE_ENERGY] < 200 && linkUpgrade.store[RESOURCE_ENERGY] < 400) {
                if (creep.transfer(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                    creep.room.storage.store[RESOURCE_ENERGY] > 100000) {
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                }
                linkSelf.transferEnergy(linkUpgrade);
            } else if (linkSelf.store.getUsedCapacity([RESOURCE_ENERGY]) > 0) {
                var target = creep.room.terminal.store.getUsedCapacity([RESOURCE_ENERGY]) < 100000 ?
                    creep.room.terminal : creep.room.storage;
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(linkSelf, RESOURCE_ENERGY);
                }
                creep.transfer(target, RESOURCE_HYDROGEN);
            } else {
                if (creep.room.storage.store[RESOURCE_HYDROGEN] > 0 && creep.room.terminal.store[RESOURCE_HYDROGEN] < 50000) {
                    if (creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.withdraw(creep.room.storage, RESOURCE_HYDROGEN);
                    }
                    creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                }
            }
        }
        if (linkUpgrade.store[RESOURCE_ENERGY] < 500) {
            linkHarvest.transferEnergy(linkUpgrade);
        } else {
            linkHarvest.transferEnergy(linkSelf);
        }
    }
}

module.exports = roleProcessor;