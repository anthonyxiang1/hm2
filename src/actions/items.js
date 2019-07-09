import fetch from 'isomorphic-fetch';

export const incrementSearches = () => ({
  type: 'INCREMENT_SEARCHES'
})

export const decrementSearches = () => ({
  type: 'DECREMENT_SEARCHES'
})

export const requestItems = (query) => ({
  type: 'REQUEST_ITEMS', query
})

export const receiveItems = (items) => ({
  type: 'RECEIVE_ITEMS', items
})

export const itemRequestFailed = (err) => ({
  type: 'ITEM_REQUEST_FAILED', err
})

export function fetchItems(query, data, requestType) {
  return function(dispatch) {
    //dispatch(requestItems(query))
    //dispatch(incrementSearches())
    if(requestType == "POST"){
      return fetch(query,{
        method: requestType,
        headers: {
              'Content-Type': 'application/json',
        },
        body: data//JSON.stringify({"data":"hello"})
      })
        // .then(response => response.json()
        //   .then(json => console.log(json)
        //     /* renders an action with status as defined above
        //     ({
        //     status: response.status,
        //     json
        //     })*/
        //   ))
    }else if(requestType == "GET"){
      return fetch(query)
        .then(response => response.json()
          .then(json => console.log(json)
        ))
    }
      /*. TODO: server side: return a object with status

      .then(({ status, json }) => {
        if (status >= 400) dispatch(itemRequestFailed())
        else dispatch(receiveItems(json))
      }, err => { dispatch(itemRequestFailed(err))  })*/
  }
}