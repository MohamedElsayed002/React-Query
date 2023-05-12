import { useState , useEffect } from 'react';
import customFetch from './utils';
import {useMutation , useQueryClient} from '@tanstack/react-query'
import {toast} from 'react-toastify'


const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient()

  const {mutate : createTask , isLoading} = useMutation({
    mutationFn : (value) => customFetch.post('/' , {title : value}),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : ['tasks']})
      toast.success('added successfully')
    },
    onError : (error) => {
      toast.error(error.response.data.msg)
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName)
    setNewItemName('')
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
