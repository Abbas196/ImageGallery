import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { useEffect, useState } from "react";
import UploadForm from './components/UploadForm';

const photos = [
  'https://picsum.photos/id/1001/200/200',
  'https://picsum.photos/id/1002/200/200',
  'https://picsum.photos/id/1003/200/200',
  'https://picsum.photos/id/1004/200/200',
  'https://picsum.photos/id/1005/200/200',
  'https://picsum.photos/id/1006/200/200',
]

function App() {
  const [count, setCount] = useState();
  const [input, setInput] = useState({title:null, file:null, path:null});
  const [items, setItems] = useState(photos);
  const [isCollapsed, collapse] = useState(false);
  const toggle = () => collapse(!isCollapsed);
  const handleOnChange = (e)=> {
    if(e.target.value === 'file'){
      setInput({...input,title: e.target.value, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])})
    }
    else{
      setInput({...input, title: e.target.value})
    }
    
  }
  const handleOnSubmit = (e)=> {
    e.preventDefault();
    setItems([input.path,...items]);
  }

  useEffect(()=>{
    setCount(`you have ${items.length} image${items.length>1 ?'s':''}`)
  }, [items])

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <button className='btn btn-success float-end' onClick={toggle}>+Add</button>
        <UploadForm 
        input = {input}
        isVisible = {isCollapsed}
        onChange = {handleOnChange}
        onSubmit = {handleOnSubmit}/>
        {count}
        <h1>Gallery</h1>
        <div className="row">
          {items.map((photo, index) => <Card key={index} src={photo} />)}

        </div>
      </div>
    </>

  );
}

export default App;
