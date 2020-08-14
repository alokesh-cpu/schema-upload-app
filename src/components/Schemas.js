import React ,{useState , useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import * as ReactBootStrap from 'react-bootstrap'

function Schemas() {
    const [ schemas , setSchemas] = useState([]);

    useEffect( () => {
        axios
        .get('/schemas')
        .then(res => {
            console.log(res);
            setSchemas(res.data)
        })
        .catch(err =>{
            console.log(err);
        })

    },[])

    const renderSchemas = (schema , index) => {
        return (
            <tr key={index}>
                <td>{schema.name}</td>
                <td>{schema.version}</td>
                <td>{schema.namespace}</td>
                <td>{schema.group_name}</td>
                <td>{schema.artifact}</td>
                <td>{schema.jsonFilepath}</td>
                <td>{schema.xsdFilepath}</td>
            </tr>
        )
    }
  return (
        <div >
        <ReactBootStrap.Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Namespace</th>
                <th>Group Name</th>
                <th>Artifact</th>
                <th>Json Path</th>
                <th>Xsd Path</th>
                </tr>
            </thead>
            <tbody>
             {
                 schemas.map(renderSchemas)
             }
            </tbody>
        </ReactBootStrap.Table>
    </div>
  );
}

export default Schemas;