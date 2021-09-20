var autoMarket = {

    deal: () => {
        if (true) {
            var orders = Game.market.getAllOrders(
                { type: ORDER_BUY, resourceType: RESOURCE_ENERGY });
            orders.sort((a, b) => b.price - a.price);

            var ordersXUH2O = Game.market.getAllOrders(
                { type: ORDER_SELL, resourceType: RESOURCE_CATALYZED_UTRIUM_ACID });
            ordersXUH2O.sort((a, b) => a.price - b.price);
            if (ordersXUH2O.length && ordersXUH2O[0].price <= 11) {
                var orderUH2O = ordersXUH2O[0];
                if (Game.rooms['E29N55']) {
                    if (Game.rooms['E29N55'].terminal.store.getFreeCapacity() > 5000 &&
                        Game.rooms['E29N55'].terminal.store.getUsedCapacity(RESOURCE_CATALYZED_UTRIUM_ACID) < 5000) {
                        var amount = Math.min(orderUH2O.amount,
                            10000 - Game.rooms['E29N55'].terminal.store.getUsedCapacity(RESOURCE_CATALYZED_UTRIUM_ACID));
                        if (Game.market.deal(orderUH2O.id, amount, 'E29N55') == 0) {
                            console.log('E29N55 buy', amount,
                                orderUH2O.resourceType,
                                'to', orderUH2O.roomName,
                                'at price', orderUH2O.price);
                        }
                    }
                }
            }

            if (orders.length && orders[0].price >= 0.5) {
                var order = orders[0];
                if (Game.time % 3 == 0) {
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
                } else if (Game.time % 3 == 1) {
                    if (Game.rooms['E28N54']) {
                        if (Game.rooms['E28N54'].storage.store.getFreeCapacity() < 100000) {
                            var amount = Math.min(order.amount, Game.rooms['E28N54'].terminal.store[RESOURCE_ENERGY]);
                            if (Game.market.deal(order.id, amount, 'E28N54') == 0) {
                                console.log('E28N54 sell', amount,
                                    order.resourceType,
                                    'to', order.roomName,
                                    'at price', order.price);
                            }
                        }
                    }
                } else if (Game.time % 3 == 2) {
                    if (Game.rooms['E28N53']) {
                        if (Game.rooms['E28N53'].storage.store.getFreeCapacity() < 100000) {
                            var amount = Math.min(order.amount, Game.rooms['E28N53'].terminal.store[RESOURCE_ENERGY]);
                            if (Game.market.deal(order.id, amount, 'E28N53') == 0) {
                                console.log('E28N53 sell', amount,
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
}

module.exports = autoMarket;