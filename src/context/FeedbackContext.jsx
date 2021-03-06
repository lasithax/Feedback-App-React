import { createContext , useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback,SetFeedback] = useState([]);

    function deleteFeedback(id){
        if(window.confirm('Are you sure you want to delete?')){
          SetFeedback(feedback.filter((item) => item.id !== id))
        }
      }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        SetFeedback([newFeedback,...feedback])
    }

    const updateFeedback = (id , updItem)=>{
        SetFeedback(feedback.map((item) => (item.id===id) ? {...item, ...updItem} : item))
    }

    const [feedbackEdit,setFeedbackEdit]= useState({
        item: {},
        edit: false,
    })

    //set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true,
        })
    }

    return <FeedbackContext.Provider 
    value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext
