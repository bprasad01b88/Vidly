import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = props => {

    // In props have a coule of properties 
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    // calculate tha number of pages 
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount === 1) return null;
    // to generate page number into this array using lodash and it will return an array
    const pages = _.range(1, pagesCount + 1);
    
    return (
        <nav>
            <ul className='pagination justify-content-center'>
            {pages.map(page => (
                <li key={page} className={ page === currentPage ? "page-item active" : "page-item"}>
                    <a className='page-link' onClick={ () => onPageChange(page) }>{page}</a>
                </li>
            ))}
                
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired
};

export default Pagination;