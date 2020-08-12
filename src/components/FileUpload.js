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

      console.log("Name: " + name);
      console.log("Version: " + version);
      console.log("Group: " + group);
      console.log("Artifact: " + artifact);
      console.log("Namespace: " + namespace);
     
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
      formData.append('file',file);
      formData.append('xsdFile', xsdFile);
    
      try {
          const res = await axios.post('/upload', formData, {
              headers: {
                  'Content-Type' : 'multipart/form-data',
                  "Accept": "application/json",
                  "type": "formData"
              }

          });

          const {fileName , filePath , xsdFileName, xsdFilePath} = res.data;
          setUploadedFile({fileName, filePath});
          setUploadedXsdFile({xsdFileName,xsdFilePath});
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
        {message? <Message msg={message} />: null}
        <form onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group col-md-8">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Transportation Enriched Agreement"/>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="version">Version</label>
                    <input type="text" className="form-control" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="namespace">Namespace</label>
                <input type="text" className="form-control" value={namespace} onChange={(e) => setNamespace(e.target.value)} placeholder="com.allstate.pmp.transportation.insurance.enrichedmodels"/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="group">Group</label>
                    <input type="text" className="form-control" value={group} onChange={(e) => setGroup(e.target.value)}  placeholder="com.allstate.pmp.transportation"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="artifact">Artifact</label>
                    <input type="text" className="form-control" value={artifact} onChange={(e) => setArtifact(e.target.value)} placeholder="transportation.insurance.enrichedmodels"/>
                </div>
            </div>
            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile1" onChange={onChange}/>
                <label className="custom-file-label" htmlFor="customFile">{filename}</label>
            </div>

            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile2" onChange={onChange2}/>
                <label className="custom-file-label" htmlFor="customFile">{xsdFilename}</label>
            </div>

            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>
        {
            uploadedFile? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-left">{uploadedFile.filePath}</h3>
                </div>
                <div className="col-md-6 m-auto">
                    <h3 className="text-left">{uploadedXsdFile.xsdFilePath}</h3>
                </div>
            </div>: null
        }
    </Fragment>
    
  )
}

export default FileUpload
