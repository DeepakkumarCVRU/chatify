import { useAuthStore } from '../store/useAuthStore.js'

const ChatPage = () => {

  const {Logout} = useAuthStore()

  return (
    <div>
      <button onClick={Logout}>Logout</button>
       </div>
  )
}

export default ChatPage