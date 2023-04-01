import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import '../../../styles/pagination.css';
import { ProductCard } from './ProductCard/ProductCard';
import './styles.css';

export default function HomePage() {
  const { products } = useTypedSelector((store) => store.product);
  const { GetProducts } = useActions();
  const fetchData = async (pageIndex: number) => {
    await GetProducts({pageIndex : pageIndex, pageSize: 3});
  }
  const handlePageClick = async (selectedItem: { selected: number }) => {
    await fetchData(selectedItem.selected + 1);
  };
  useEffect(() => {
    fetchData(products.pageIndex);
  }, []);
  return (
    <div>
    { products.items.length > 0 ? (
      <div className='card-wrapper'>
    {
      products.items.map(pr => (
          <ProductCard product={pr}>

          </ProductCard>
      ))
      
    }
    
    </div>) : (
      <h3 className='text-center'>
        NOT FOUND
      </h3>
    )
    }
    
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={products.totalPages}
        forcePage={products.pageIndex - 1}
        previousLabel="< previous"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="pagination-item-active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
        // renderOnZeroPageCount={null}
      />
     
    </div>
  )
}