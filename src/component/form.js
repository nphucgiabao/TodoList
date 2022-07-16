import {useState, useEffect} from 'react';

function Form(props) {
    const [work, setWork] = useState({id: 0, name: '', status: false});
    const [checked, setChecked] = useState(work.status);

    useEffect(() => {
        setWork(props.editWork);
        setChecked(props.editWork.status);
    }, [props.editWork]);

    const submit = (e) => {
        e.preventDefault();    
        if (props.type === 'Edit')  
            props.updateWork(work);
        else
            props.addWork(work);
        setWork({id: 0, name: '', status: false});
    }

    const change = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if (e.target.type === 'radio') {
            if (props.editWork)
                props.editWork.status = value === 'true' ? true : false;
            setWork((prev) => ({...prev, status: value === 'true'? true : false}));
            setChecked(value === 'true'? true : false);
        } else {
            setWork((prev) => ({...prev, [name]: value}));
        }       
    }
    
    return (
        <form className="form-group">
            <label className="col-form-label">Id:</label>
            <input  onChange={change} type='text' className="form-control" name="id" value={work.id}></input>
            <label className='col-form-label'>Name</label>
            <input  onChange={change} type='text' className='form-control' name="name" value={work.name}></input>
            <label className='col-form-label'>Status</label>
            <input  onChange={change} type='radio' className='form-inline' checked={checked} value={true}></input>done
            <input  onChange={change} type='radio' className='form-inline' checked={!checked} value={false}></input>pending
            <button className='btn btn-success' onClick={submit}>{props.type}</button>
        </form>
    );
}

export default Form;