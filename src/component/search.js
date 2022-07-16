import {useState} from 'react'

function Search(props) {
    const [keyWord, setKeyWord] = useState('');

    const submit = (e) => {
        e.preventDefault()
        props.search(keyWord);
    }

    return (
        <form className='form-inline' onSubmit={submit}>
            <input type='text' className='form-control' value={keyWord} onChange={(e) => setKeyWord(e.target.value)}/>
            <button type='submit' className='btn btn-success'>Search</button>
        </form>
    );
}

export default Search;