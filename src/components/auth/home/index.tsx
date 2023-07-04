import { Alert, Button, Divider, Pagination, Select, Space, Spin, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import '../../../styles/pagination.scss';
import EclipseWidget from '../../common/Eclipse';
import { RangeSlider, RangeSliderProps } from '../../common/RangeSlider/RangeSlider';
import { ProductCard } from './ProductCard/ProductCard';
import './styles.scss';
import { Categories } from './Categories/Categories';
const { Title } = Typography;
export default function HomePage() {
  const { products, loading } = useTypedSelector((store) => store.product);
  const { GetProducts } = useActions();
  const [priceRange, setPriceRange] = useState<RangeSliderProps['range']>([1, 30000000]); // Define the initial range values

  const [searchParams, setSearchParams] = useSearchParams();
  //const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async (pageIndex: number, search: string | null, priceFrom: number | null, priceTo: number | null, sortBy: string | null, category: string | null) => {
    let isSortAscending: boolean = true;
    let sortByParam : string | null = null;
    if(sortBy){ 
      switch(sortBy){
        case 'price':
          sortByParam = 'price';
          break;
        case 'priceDesc':
          isSortAscending = false;
          sortByParam = 'price';
          break;
        case 'name':
          sortByParam = 'name';
          break;
        default:
          break;
      }
    }
    await GetProducts({pageIndex : pageIndex, pageSize: 3, search: search, priceFrom : priceFrom, priceTo : priceTo, sortBy: sortByParam, isSortAscending: isSortAscending, category: category});
  }
  const handlePagination = async (page: number) => {
    //console.log('page', page.toString());
    // create a copy of the previous searchParams object
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', page.toString());
     setSearchParams(updatedSearchParams);
    //await fetchData(page);
  }
  const handleEffect = () =>{
    if(searchParams){
      const pageString = searchParams.get('page');
      const priceFrom = searchParams.get('priceFrom') ? parseInt(searchParams.get('priceFrom') as string) : null;
      const priceTo = searchParams.get('priceTo') ? parseInt(searchParams.get('priceTo') as string) : null;
      
      //console.log(pageString && !isNaN(Number(pageString)) ? Number(pageString) : 1);
      fetchData(pageString && !isNaN(Number(pageString)) ? Number(pageString) : 1, searchParams.get('search'), priceFrom, priceTo, searchParams.get('sortBy'), searchParams.get('category'));
    }
  }
  const onSearch = (value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    if(value){
      updatedSearchParams.set('search', value);
    }
    else{
      updatedSearchParams.delete('search');
    }
    setSearchParams(updatedSearchParams);
  }
  const handleApplyPriceRange = () =>{
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('priceFrom', priceRange[0].toString());
    updatedSearchParams.set('priceTo', priceRange[1].toString());
    setSearchParams(updatedSearchParams);
  }
  const handlePriceRangeChanged : RangeSliderProps['onRangeChange'] = (newRange) => {
    setPriceRange(newRange);
  }
  useEffect(() => {
    handleEffect();
  }, [searchParams, setSearchParams]);
  const handleSort = (value: string) =>{
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('sortBy', value);
    setSearchParams(updatedSearchParams);
  }
  const onCategoryChange = (categoryId: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('category', categoryId);
    setSearchParams(updatedSearchParams);
  }
  return (
    <>
    {loading && (
      <EclipseWidget/>)}
    <div className="d-flex flex-column flex-md-row justify-content-center">
      
      <Content className="col-md-3 gap-3 mb-5 mb-md-0 d-flex flex-column ps-5 pe-5">
        <div className="d-flex gap-2 flex-column">
          <Title level={5} className="m-0">Ціна:</Title>
          <div>
            <RangeSlider
              min={1}
              max={30000000}
              range={priceRange}
              onRangeChange={handlePriceRangeChanged}
            />
          </div>
          <Button onClick={handleApplyPriceRange}>Застосувати</Button>
        </div>
        <div>
          <div className="mb-2">
            <Title level={5}>Сортувати за:</Title>
            <Select
              className="w-100"
              defaultValue="disabled"
              onChange={handleSort}
              options={[
                { value: "price", label: "Спочатку дешевші" },
                { value: "priceDesc", label: "Спочатку дорожчі" },
                { value: "name", label: "За іменем" },
                { value: "disabled", label: "Не визначено", disabled: true },
              ]}
            />
          </div>
          {/* <Button className='w-100' onClick={handleSort}> Застосувати </Button> */}
        </div>
        <div>
          <Categories onCategoryChange={onCategoryChange}></Categories>
          <Button
            onClick={() => {
              const updatedSearchParams = new URLSearchParams(searchParams);
              updatedSearchParams.delete("category");
              setSearchParams(updatedSearchParams);
            }}
            className="w-100"
          >
            Прибрати категорію
          </Button>
        </div>
      </Content>
      <div className="mt-2 text-center col-md-9">
        <Search
          placeholder="Search by name or description"
          defaultValue={searchParams.get("search") as string}
          onSearch={onSearch}
          enterButton
          className="mb-5 w-75"
        />
        {/* {loading && <EclipseWidget/>} */}
        {products.items.length > 0 ? (
          <div className="card-wrapper">
            {products.items.map((pr) => (
              <ProductCard key={pr.id} product={pr}> </ProductCard>
            ))}
          </div>
        ) : (
          <Title level={3} className="text-center">ТОВАРІВ НЕМАЄ</Title>
        )}
        <Divider>
          {/* <Pagination current={searchParams.get('page') as number} onChange={handlePagination} total={products.totalCount} pageSize={3} className="mt-3 text-center"/> */}
          <Pagination
            current={products.pageIndex}
            onChange={handlePagination}
            total={products.totalCount}
            pageSize={3}
            className="mt-3 text-center"
          />
        </Divider>
        {/* <ReactPaginate
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
        /> */}
      </div>
    </div>
    </>
  );
}