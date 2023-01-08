import _ from 'lodash';

// export paginate function and pass array of items, pageNumber and pageSize as an argument
export function paginate(items, pageNumber, pageSize){
    // calculate the starting Index  of the items on this page(pageNumber) and set pageNumber -1 Times
    const startIndex = (pageNumber - 1) * pageSize;
    // use lodash to go this start index and take all the items of the current page
    // slicing of an array starting from the startIndex give as an parameter
    // take method give the total numbers of items from an array
    return _(items).slice(startIndex).take(pageSize).value();
}