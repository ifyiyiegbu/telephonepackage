// Observer class
class contactListObserver {
    constructor() {
      this.updates = [];
    }
  
    Update(name, number, action) {
      this.updates.push({ name, number, action });
      console.log(`Contact list updated ${name} ${action} (${number})`);
    }
  }
  
  class printPhoneNumberObserver {
    Update(number) {
      console.log(`${number}`);
    }
  }
  
  class dialingPhoneNumberObserver {
    Update(number) {
      console.log(`Now Dialing ${number}`);
    }
  }
  
  class Telephone {
    constructor() {
      this.contactList = new Map();
      this.observers = [];
    }
  
    AddPhoneNumber(name, number) {
      if (this.contactList.has(name)) {
        console.log(`${name} already exists in the contact list.`);
      } else {
        this.contactList.set(name, number);
        console.log(`${name} has been added to the contact list.`);
        this.notifyObservers(name, number, 'added');
      }
    }
  
    RemovePhoneNumber(name) {
      if (this.contactList.has(name)) {
        const number = this.contactList.get(name);
        this.contactList.delete(name);
        console.log(`${name}'s phone number removed from the contact list.`);
        this.notifyObservers(name, number, 'deleted');
      } else {
        console.log(`${name} does not exist in the contact list.`);
      }
    }
  
    DialPhoneNumber(name) {
      if (this.contactList.has(name)) {
        const number = this.contactList.get(name);
        this.notifyObservers(number);
      } else {
        console.log(`${name} does not exist in the contact list.`);
      }
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    deleteObserver(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notifyObservers(...args) {
      this.observers.forEach(observer => observer.Update(...args));
    }
  }
  
  // implementation

  const phone = new Telephone();
  const observer1 = new printPhoneNumberObserver();
  const observer2 = new dialingPhoneNumberObserver();
  
  phone.addObserver(observer1);
  phone.addObserver(observer2);
  
  phone.AddPhoneNumber("Vivian", "2349045638211");
  phone.AddPhoneNumber("Alfred", "2348136549312");
  phone.AddPhoneNumber("Chika", "2347065770102");
  console.log(phone.contactList);
  phone.DialPhoneNumber("Adam");
  phone.DialPhoneNumber("Chika");
  phone.deleteObserver(observer1);
  phone.deleteObserver(observer2);
  