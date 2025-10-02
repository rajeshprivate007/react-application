import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form className='user-form'>
        <label>Name</label>
        <input
          type='text'
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
