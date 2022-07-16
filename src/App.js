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

  useEffect(() => {
    
  }, [works]);

  const edit = (id) => {
    let work = works.find((item) => item.id === id);
    //console.log(work);
    setWorkEdit({...work});
    setType('Edit');
  }

  const add = (work) => {
    //console.log(works.includes(work));
    setWorks((prev) => {
      //console.log(prev);
      return [...prev, work];
    });
    localStorage.setItem('store', JSON.stringify([...works, work]));
    alert('Success');
  }

  const update = (work) => {
    let newData = works.map((item) => {
      if (item.id === work.id)
        return work;
      return item;
    });
    setWorks(newData);
    setType('Add');
    localStorage.setItem('store', JSON.stringify(newData));
    alert('Success');
  }

  const remove = (id) => {
    if(window.confirm('Do you want remove this item?')){
      var newWorks = works.filter((item)=> item.id !== id);
      setWorks(newWorks);
      localStorage.setItem('store', JSON.stringify(works));
    }
  }

  const search = (keyWord) => {
    if (keyWord) {
      let data = works.filter((item) => {
        return item.name.indexOf(keyWord) >= 0;
      });
      setFilter(data);
    } else {
      setFilter(null);
    }
  }

  const change = (number) => {
    let index = number * 5 ;
    let length = (index + 5) > works.length ? works.length : (index + 5);
    let data = works.slice(index, length);
    setWorks(data);
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
              <Paging length={works.length} changePage={change}></Paging>
            </div>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
