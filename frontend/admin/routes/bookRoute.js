"use strict"

module.exports = {
    path: ':id',
    
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('../components/Book'))
        })
    }
}

