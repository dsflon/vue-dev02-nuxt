const Sort = ( type, data ) => {

    if(!type) return data

    switch (type) {

        case "min_price":
        return data.sort( (a,b) => a[type] > b[type] ? 1 : -1 );

        default:
        return data.sort( (a,b) => a[type] < b[type] ? 1 : -1 );

    }

}

const ListFilter = ( originData, filterData, callback ) => {

    let newFilterData = {};

    // console.log(filterData);

    // Price Min
    new Promise((resolve, reject) => {
        if(filterData.min_price && filterData.min_price.n) {
            newFilterData.min_price = filterData.min_price;
            resolve( originData.filter( data => data.min_price >= filterData.min_price.n) );
        } else {
            resolve(originData);
        }
    })

    // Price Max
    .then( data => {
        return new Promise((resolve, reject) => {
            if(filterData.max_price && filterData.max_price.n) {
                newFilterData.max_price = filterData.max_price;
                resolve( data.filter( data => data.max_price <= filterData.max_price.n) );
            } else {
                resolve(data);
            }
        })
    })

    // Start Time
    .then( data => {
        return new Promise((resolve, reject) => {
            if(filterData.start_time && filterData.start_time.n) {
                newFilterData.start_time = filterData.start_time;
                resolve( data.filter( data => data.start_time <= filterData.start_time.n) );
            } else {
                resolve(data);
            }
        })
    })

    // End Time
    .then( data => {
        return new Promise((resolve, reject) => {
            if(filterData.end_time && filterData.end_time.n) {
                newFilterData.end_time = filterData.end_time;
                resolve( data.filter( data => data.end_time >= filterData.end_time.n) );
            } else {
                resolve(data);
            }
        })
    })

    .then( data => {
        return new Promise((resolve, reject) => {
            if(filterData.sort && filterData.sort.type) {
                newFilterData.sort = filterData.sort;
                resolve( Sort(filterData.sort.type,data) );
            } else {
                resolve(data);
            }
        })
    })

    .then( data => {
        callback(
            data,
            Object.keys(newFilterData)[0] ? newFilterData : null
        )
    });

}

export default ListFilter;
