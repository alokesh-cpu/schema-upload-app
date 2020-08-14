import React, { Fragment, useState } from 'react'
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {

  const [file , setFile] = useState('');
  const [filename , setFilename] = useState('Choose Json File Path');
  const [xsdFile , setXsdFile] = useState('');
  const [xsdFilename , setXsdFilename] = useState('Choose Xsd File Path');
  const [uploadedFile , setUploadedFile] = useState({});
  const [uploadedXsdFile , setUploadedXsdFile] = useState({});
  const [ message , setMessage] = useState('');
  const [name , setName] = useState('');
  const [version , setVersion] = useState('');
  const [namespace , setNamespace] = useState('');
  const [group , setGroup] = useState('');
  const [artifact , setArtifact] = useState('');
  

  const onChange = e =>{
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const onChange2 = e =>{
    setXsdFile(e.target.files[0]);
    setXsdFilename(e.target.files[0].name)
  }

  const onSubmit = async e =>{
      e.preventDefault();

    //   console.log("Name: " + name);
    //   console.log("Version: " + version);
    //   console.log("Group: " + group);
    //   console.log("Artifact: " + artifact);
    //   console.log("Namespace: " + namespace);
     
      const jsonDataObj = {
        "name": name,
        "version": version,
        "namespace": namespace,
        "group_name": group,
        "artifact" : artifact
      };
      console.log(JSON.stringify(jsonDataObj));
      const formData = new FormData();
      formData.append('schemaJson' , JSON.stringify(jsonDataObj));
      formData.append('jsonFile',file);
      formData.append('xsdFile', xsdFile);
    
      try {
          const res = await axios.post('/schemas', formData, {
              headers: {
                  'Content-Type' : 'multipart/form-data',
                  "Accept": "application/json",
                  "type": "formData"
              }

          });

         // const {fileName , filePath , xsdFileName, xsdFilePath} = res.data;
          const {code , message , jsonFileName, jsonFilePath,xsdFileName, xsdFilePath } = res.data;
          setUploadedFile({jsonFileName,jsonFilePath, xsdFileName,xsdFilePath});
          //setUploadedXsdFile({xsdFileName,xsdFilePath});
          setMessage('File uploaded sucessfully');
      } catch (err) {
          if(err.response.status === 500){
              setMessage("Problem with the server");
          }
          else{
              setMessage(err.response.data.msg);
          }
      }

  }

  return (
    <Fragment>
        <div className="wrapper">
            <div className="form-wrapper">
            <h4>Upload New Schema</h4>
                    <form onSubmit={onSubmit}>
                   
                        <div className="name">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                        </div>
                        <div className="version">
                            <label htmlFor="version">Version</label>
                            <input type="text" className="form-control" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Version"/>
                        </div>
                  
                    
                        <div className="namespace">
                            <label htmlFor="namespace">Namespace</label>
                            <input type="text" className="form-control" value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="Namespace"/>
                        </div>
                    
                    
                        <div className="version">
                            <label htmlFor="group">Group</label>
                            <input type="text" className="form-control" value={group} onChange={(e) => setGroup(e.target.value)}  placeholder="Group name"/>
                        </div>
                        <div className="artifact">
                            <label htmlFor="artifact">Artifact</label>
                            <input type="text" className="form-control" value={artifact} onChange={(e) => setArtifact(e.target.value)} placeholder="Artifact"/>
                        </div>
                    
                    <div className="custom-file mb-2 ">
                        <input type="file" className="custom-file-input" id="customFile1" onChange={onChange}/>
                        <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                    </div>

                    <div className="custom-file mb-2 ">
                        <input type="file" className="custom-file-input" id="customFile2" onChange={onChange2}/>
                        <label className="custom-file-label" htmlFor="customFile">{xsdFilename}</label>
                    </div>

                    <input type="submit" value="Upload" className="button" />
                </form>
            </div>
            {message? <Message msg={message} />: null}
            {
            /**
             * uploadedFile? <div >
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <h5 className="text-left">{uploadedFile.jsonFileName}</h5>  
                        </div>
                        <div className="col-md-6 m-auto">
                            <h5 className="text-left">{uploadedFile.jsonFilePath}</h5>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto">
                            <h5 className="text-left">{uploadedFile.xsdFileName}</h5>  
                        </div>
                        <div className="col-md-6 m-auto">
                            <h5 className="text-left">{uploadedFile.xsdFilePath}</h5>
                        </div>
                    </div>
                </div>: null
            
             * 
             */
            }
                
        </div>
        
    </Fragment>
    
  )
}

export default FileUpload
