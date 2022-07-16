//import {useState} from 'react';

function List(props) {

    //const [works, setWorks] = useState();

    const renderDataToView = props.works.map((item)=>{
        return (<tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status? 'done': 'pending'}</td>
                  <td>
                    <button className='btn btn-sm btn-success' onClick={() => props.editWork(item.id)}>Edit</button>
                    <button className='btn btn-sm btn-warning' onClick={() => props.removeWork(item.id)}>Delete</button>
                  </td>
               </tr>);
    });

    return(
         
        <table className='table table-bordered'>
            <thead>
                <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Status</td>
                <td>Actions</td>
                </tr>               
            </thead>
            <tbody>
                {renderDataToView}
            </tbody>
        </table>
    );
}

export default List;