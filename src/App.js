import Form from './component/form';
import List from './component/list';
import Search from './component/search';
import Paging from './component/paging';
import {useState, useEffect} from 'react';

function App() {
  const data = () => {
    let store = localStorage.key('store');
    if (store)
      return JSON.parse(localStorage.getItem('store'));
    return [];
  }

  const [works, setWorks] = useState(data);
  const [workEdit, setWorkEdit] = useState({});
  const [type, setType] = useState('Add');
  const [filter, setFilter] = useState(null);
  const [paging, setPaging] = useState(0);
  const [length, setLength] = useState(() => {
    let list = data();
    return list.length;
  });

  useEffect(() => {
    setWorks(change(paging));
  }, [paging]);

  useEffect(() => {
    setPaging(paging);
  }, [length]);

  const edit = (id) => {
    let work = works.find((item) => item.id === id);
    //console.log(work);
    setWorkEdit({...work});
    setType('Edit');
  }

  const add = (work) => {
    let list = JSON.parse(localStorage.getItem('store'));
    localStorage.setItem('store', JSON.stringify([...list, work]));
    setWorks(change(paging));    
    setLength(list.length++);
    alert('Success');
  }

  const update = (work) => {
    let list = JSON.parse(localStorage.getItem('store'));
    let newData = list.map((item) => {
      if (item.id === work.id)
        return work;
      return item;
    });
    localStorage.setItem('store', JSON.stringify(newData));
    setWorks(change(paging));
    setType('Add');    
    alert('Success');
  }

  const remove = (id) => {
    if (window.confirm('Do you want remove this item?')) {
      let list = JSON.parse(localStorage.getItem('store'));
      var newWorks = list.filter((item) => item.id !== id);
      localStorage.setItem('store', JSON.stringify(newWorks));   
      setWorks(change(paging));         
      setLength(newWorks.length);
    }
  }

  const search = (keyWord) => {
    if (keyWord) {
      let list = JSON.parse(localStorage.getItem('store'));
      let data = list.filter((item) => {
        return item.name.indexOf(keyWord) >= 0;
      });
      setFilter(data);
    } else {
      setFilter(null);
    }
  }

  const change = (number) => {
    let list = JSON.parse(localStorage.getItem('store'));
    let index = number * 5 ;
    let length = (index + 5) > list.length ? list.length : (index + 5);   
    return list.slice(index, length);
  }

  return (
    <div className="container-fluid">
      <header className="container bg-primary text-center">
        <h3>Todo List App</h3>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className='container-fluid'>
              <Form addWork={add} editWork={workEdit} updateWork={update} type={type}></Form>
            </div>
          </div>
          <div className="col-md-8 pt-4">
            <div className='container-fluid'>
              <Search search={search}></Search>
            </div>
            <div className='container-fluid'>
              <List works={filter || works} editWork={edit} removeWork={remove} filter={filter}></List>
            </div>   
            <div className='container-fluid'>
              <Paging length={length} page={paging} changePage={(number) => setPaging(number)}></Paging>
            </div>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
