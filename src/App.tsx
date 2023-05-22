import './App.css';
import Chat from './features/chat/Chat';
import EntryForm from './features/entryForm/EntryForm';
import {useAppSelector} from './app/hooks';

function App() {
    const user = useAppSelector((store) => store.user);
    return user.authorized
        ? <Chat/>
        : <EntryForm/>;
}

export default App;
