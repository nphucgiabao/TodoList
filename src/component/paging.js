import {useState, useEffect} from 'react';

function Paging(props) {
    const [pages, setPages] = useState(0);

    useEffect(() => {
        let length = props.length % 5 === 0 ? props.length/5 : Math.floor(props.length/5)+1;
        setPages(length);
    }, []);

    useEffect(() => {

    }, [props]);

    const render = () => {       
        let result = [];
        for(let i = 0; i < pages; i++){
            result.push((<li key={i} className={"page-item "+ props.page === i ?? "active"}><a className="page-link" onClick={() => props.changePage(i)}>{(i+1)}</a></li>));
        }
        return result;
    }
    return (        
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link">Previous</a></li>
                {render()}
                <li className="page-item"><a className="page-link">Next</a></li>
            </ul>
        </nav>
    );
}

export default Paging;