import { Button, Pagination, Table } from "antd";
import Search from "antd/es/input/Search";
import moment from 'moment';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IUserAdmin } from "./types";
import EclipseWidget from "../../../common/Eclipse";

export  const UsersList : React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { GetUsers } = useActions(); 
  const navigate = useNavigate();
  const { users, isLoading } = useTypedSelector(state => state.adminUser);
  const fetchData = async (pageIndex: number, search: string | null) => {
    await GetUsers({pageIndex : pageIndex, pageSize: 5, search: search});
  }
  useEffect(() => {
      const pageString = searchParams.get('page');
      fetchData(pageString && !isNaN(Number(pageString)) ? Number(pageString) : 1,searchParams.get('search') )     
  },[searchParams, setSearchParams]);
  const handlePagination = async (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', page.toString());
    setSearchParams(updatedSearchParams);
  }
  const onSearch = (value: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    if(value){
      updatedSearchParams.set('search', value);
      updatedSearchParams.set('page', '1');
    }
    else{
      updatedSearchParams.delete('search');
    }
    setSearchParams(updatedSearchParams);
  }
    const columns = [
        {
          title: 'Info',
          dataIndex: 'info',
          key: 'id',
          render: (_ : any, record : IUserAdmin) => (
            <div className="d-flex flex-column">
              <p>
                <span>Дата реєстрації: </span>
              {moment(record.registrationDay).format('YYYY/DD/MM')}

              </p>
              <p>
                <span>Id: </span>
              {record.id}

              </p>
              <Button onClick={() => navigate(`${record.id}`)} className="w-25">Go to</Button>
            </div>
          )
        },
        {
          title: 'Info',
          dataIndex: 'inform',
          key: 'inform',
          render: (_ : any, record : any) => (
            <div className="d-flex flex-column">
              <p>
              {record.email}
              </p>
              <p>{record.name}</p>
              <p>{record.phone}</p>
            </div>
          )
        },
        {
          title: 'Roles',
          dataIndex: 'roles',
          key: 'roles',
          render: (_ : any, record : any) => (
            <div className="d-flex flex-column">
              {record.roles.map((r : any) => (
                  <p>{r}</p>
              ))}
              
            </div>
          )
        },
        
      ];
    return(
        <div className="pt-3">
        <Search placeholder="Search by name or id" defaultValue={searchParams.get('search') as string} onSearch={onSearch} enterButton className='mb-5 w-75'/>
        {isLoading && <EclipseWidget/>}
        <Table columns={columns} dataSource={users.items} pagination={false}/>
        <Pagination defaultCurrent={1} total={users.totalCount} current={users.pageIndex} onChange={handlePagination} pageSize={5} className="mt-3 text-center"/>
        </div>
    )
}
export default UsersList;