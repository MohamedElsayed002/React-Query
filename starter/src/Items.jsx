import SingleItem from './SingleItem';
import customFetch from './utils';
import {useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
const Items = ({ items }) => {

  const {isLoading,data,error,isError} = useQuery({
    queryKey : ['tasks'],
    queryFn  : async () => {
      const {data} = await customFetch.get('/')
      return data
    }
  })

  useEffect(() => {
  } , [data])

  console.log(data,isLoading,error,isError)
  if(isLoading) {
    return <p style={{marginTop : '1rem'}}>Loading....</p>
  }
  if(isError) {
    return <p>{error.response.data}</p>
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
