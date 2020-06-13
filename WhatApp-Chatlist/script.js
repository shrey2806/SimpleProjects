

const chat_names = ["Tanmay Bhatt", "Kumar Varun","Urooj Asfaq","Biswa K Rath","Jaya Sethi","Rahul Subramanium","Akash Gupta"];
const chat_msg = ["Aby aaj ka kya scene hai","Mera Standup Dekha kYa?","Here's free tickets to my show",
"Mera prime-video kesa laga","Chal na milte hai?"];
onload = function(){

    const chatList = this.document.getElementById('chatList');
    const generate = this.document.getElementById('generate-step');
    const template = this.document.getElementsByTagName('template')[0];
    const notifications = this.document.getElementById('notificationDisplay');
    const chatItem = template.content.querySelector('li');
    
    const chatHandler = new ChatResolver(chatItem,chatList);

    let chats = [];

    generate.onclick = function(){
        if(chats.length > 0 && Math.random() > 0.75){
            let index = Math.floor(Math.random()*chats.length);
            let idToDelete = chats[index];
            chatHandler.deleteMessage(idToDelete);
            notifications.innerHTML = "Deleted Message from "+ chat_names[idToDelete] + "<br>" + notifications.innerHTML;
            chats.slice(index,1);
        }else{
            let index = Math.floor(Math.random()*7);
            console.log('index is ', index);
            if(chats.includes(index) === false){
                console.log("inside includes");
                chats.push(index);
            }
            chatHandler.addMessage(index);
            console.log(notifications.innerHTML);
            notifications.innerHTML = "New Message from " + chat_names[index] + "<br>" + notifications.innerHTML;


        }


    }
    

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
        let node = null;
        console.log(this.hashMap);
        console.log(this.hashMap.has(id));
        // if((id in this.hashMap) === null){
        if(this.hashMap.has(id)===false){
            console.log('inside');
            node = this.createNode(id);
            this.hashMap[id] = node;

        }else{
            console.log("present");
            //extract from the linked list;
             node = this.extractFromList(id);

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
    extractFromList(id){
        
        let node = this.hashMap[id];
        console.log(node);
        let prevNode = node['prev'];
        let nextNode = node['next'];
        
        node['prev'] = null;
        node['next'] = null;

        if(prevNode!==null){
            prevNode['next'] = nextNode;
        }
        if(nextNode!==null){
            nextNode['prev'] = prevNode;
        }   

        if(node === this.linked_list){
            this.linked_list = nextNode;
        }

        return node;

    }

    createNode(id){
        // Tasks create 
        let node={};
        node['next']= null;
        node['prev'] = null;
        let chat_item = this.chat_template.cloneNode(true);
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names.length];
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg.length];
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1 + id%chat_names.length) + ".png";
        node['chat_item'] = chat_item;
        return node;
    }

    deleteMessage(id){
        let node = this.extractFromList(id);
        delete this.hashMap[id];
        this.updateView();

    }

    updateView(){
        let innerhtml = '';
        let head = this.linked_list;
        while(head!==null){
            innerhtml += head['chat_item'].outerHTML;
            head = head['next'];

        }

        this.chatList.innerHTML = innerhtml;
    }

}