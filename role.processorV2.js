var roleProcessor = {

    run: function (creep, linkSelf, linkUpgrade, linkHarvest, factory) {
        if (!creep.pos.isEqualTo(Game.flags.Proc1)) {
            creep.moveTo(Game.flags.Proc1, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN);
            creep.transfer(factory, RESOURCE_MIST);
            creep.transfer(factory, RESOURCE_KEANIUM_BAR);
            creep.transfer(factory, RESOURCE_KEANIUM);

            if (linkHarvest.store[RESOURCE_ENERGY] < 200 && linkUpgrade.store[RESOURCE_ENERGY] < 400) {
                if (creep.transfer(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                    creep.room.storage.store[RESOURCE_ENERGY] > 100000) {
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                }
                linkSelf.transferEnergy(linkUpgrade);
            } else if (creep.room.terminal.store.getUsedCapacity([RESOURCE_ENERGY]) < 100000) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    if (creep.withdraw(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    }
                }
            } else if (factory.store.getUsedCapacity([RESOURCE_ENERGY]) < 1000) {
                if (creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    if (creep.withdraw(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    }
                }
            } else if (linkSelf.store.getUsedCapacity([RESOURCE_ENERGY]) > 0) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(linkSelf, RESOURCE_ENERGY);
                }
            } else if (creep.room.storage.store[RESOURCE_HYDROGEN] > 100 && creep.room.terminal.store[RESOURCE_HYDROGEN] < 50000) {
                if (creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(creep.room.storage, RESOURCE_HYDROGEN);
                }
                creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
            } else if (creep.room.terminal.store[RESOURCE_MIST] > 100 && factory.store[RESOURCE_MIST] < 1000) {
                if (creep.transfer(factory, RESOURCE_MIST) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(creep.room.terminal, RESOURCE_MIST);
                }
                creep.transfer(factory, RESOURCE_ENERGY);
            } else if (creep.room.terminal.store[RESOURCE_KEANIUM_BAR] > 100 && factory.store[RESOURCE_KEANIUM_BAR] < 1000) {
                if (creep.transfer(factory, RESOURCE_KEANIUM_BAR) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM_BAR);
                }
                creep.transfer(factory, RESOURCE_ENERGY);
            } else if (creep.room.terminal.store[RESOURCE_KEANIUM] > 100 && factory.store[RESOURCE_KEANIUM] < 1000) {
                if (creep.transfer(factory, RESOURCE_KEANIUM) == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM);
                }
                creep.transfer(factory, RESOURCE_ENERGY);
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

/*Game.market.createOrder({
    type: ORDER_BUY,
    resourceType: RESOURCE_KEANIUM_BAR,
    price: 0.23,
    totalAmount: 3000,
    roomName: "E28N54"   
});

*/