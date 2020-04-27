import { LOAD_DATA } from "./actionTypes";

function negativeNumberCheck(digit) {
    if (digit === 1) {
        return true
    } else {
        return false
    }
}

function addProperty(obj) {
    return {
        ...obj,
        growth: negativeNumberCheck(Math.sign(obj.change))
    }
}

function addQuotesToArray(listData, quotesObj) {
    if (listData.length === 0) {
        listData.push(addProperty(quotesObj))
    } else {
        const index = listData.findIndex(item => item.symbol === quotesObj.symbol)
        
        if (index === -1) {
            listData.push(addProperty(quotesObj))
        } else {
            if (quotesObj.lasttime > listData[index].lasttime) {
                listData[index] = addProperty(quotesObj)
            }
        }
    }
}

export const quotesReducer = (state, action) => {
    switch (action.type) {
        case LOAD_DATA: {

            let quotesList = [...state.listData]
            addQuotesToArray(quotesList, action.payload.data)

            return Object.assign({}, state, { listData: quotesList })
        }
        default:
            return state;
    }
};