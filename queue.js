class QueueNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
  
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    
    //new node goes to back of the line/end of the queue
    enqueue(value) {
        const newNode = new QueueNode(value);
        //if queue is empty
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
            // add current first pointer to new first(new node), and make new node new first
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        //add 1 to size
        this.size++;
  
        return this;
    }
    // dequeue nodes off the front of the line
    dequeue() {
        //if queue is empty return false
        if (this.size === 0) return false;
        //get dequeuedNode
        const dequeuedNode = this.first;
        //get new first (could be NULL if stack is length 1)
        const newFirst = this.first.next;
        //if newFirst is null, reassign last to newFirst(null)
        if (!newFirst) {
            this.last = newFirst;
        }
        //assign new first
        this.first = newFirst;
        //remove reference to list
        dequeuedNode.next = null;
        //remove 1 from size
        this.size--;
        //return dequeued node
        return dequeuedNode;
    }
  }

  module.exports = Queue;