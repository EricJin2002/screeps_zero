var roleProcessor = {

    run: function (creep, linkSelf, linkUpgrade) {
        if (!creep.pos.isEqualTo(Game.flags.Proc1)) {
            creep.moveTo(Game.flags.Proc1, { visualizePathStyle: { stroke: '#ff0000' } });
        } else {
            if (creep.transfer(linkSelf, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES &&
                creep.room.storage.store[RESOURCE_ENERGY] > 40000) {
                creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            }
            if (linkUpgrade.store[RESOURCE_ENERGY] < 700) {
                linkSelf.transferEnergy(linkUpgrade);
            }
        }
    }
}

module.exports = roleProcessor;