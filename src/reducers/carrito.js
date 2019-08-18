import { SET_CARRITO } from '../actions/types'

const initState = {
    carrito: {}
}

export default function(state=initState, action) {
    switch (action.type) {
        case SET_CARRITO:
            return Object.assign({}, state, { carrito: action.payload.carrito })
        default:
            return state
    }
}