var autoMarket = {
    
    deal: () => {
        if (Game.time % 2 == 0) {
            var orders = Game.market.getAllOrders(
                { type: ORDER_BUY, resourceType: RESOURCE_ENERGY });
            orders.sort((a, b) => b.price - a.price);
            if (orders.length && orders[0].price >= 0.5) {
                var order = orders[0];
                if (Game.rooms['E29N55']) {
                    if (Game.rooms['E29N55'].storage.store.getFreeCapacity() < 100000) {
                        var amount = Math.min(order.amount, Game.rooms['E29N55'].terminal.store[RESOURCE_ENERGY]);
                        if (Game.market.deal(order.id, amount, 'E29N55') == 0) {
                            console.log('E29N55 sell', amount,
                                order.resourceType,
                                'to', order.roomName,
                                'at price', order.price);
                        }
                    }
                }
            }
        }
    }
}

module.exports = autoMarket;