
//import { ChatResolver, chat_names } from './ChatResolver.js';

onload = function(){

    const chatList = this.document.getElementById('chatList');
    const generate = this.document.getElementById('generate-step');
    const template = this.document.getElementsByTagName('template')[0];
    const notifications = this.document.getElementById('notificationDisplay');

    const chatItem = template.content.querySelector('li');
    
    

}


class ChatResolver{


    constructor(chat_template, chatList){
        this.linked_list = null;
        this.chat_template = chat_template;
        this.hashMap = new Map();
        this.chatList = chatList; 
    }


    addMessage(id){
        // If person is not present in the list;
        
        if((id in this.hashMap)===null){

            let node = this.createNode(id);
            this.hashMap[id] = node;

        }else{
            //extract from the linked list;
            let node = this.extractFromList(id);

        }

        if(this.linked_list===null){
            // Add it to front;
            this.linked_list = node;
        }
        else{
            // Make 
            this.linked_list['prev'] = node;
            node['next'] = this.linked_list;
            this.linked_list = node;
            

        }

        this.updateView();
    }

    createNode(id){




    }



}