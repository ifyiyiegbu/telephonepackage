// Observer class
class PhoneBookObserver {
    constructor() {
      this.updates = [];
    }
  
    // Method called by the Telephone class to notify updates
    Update(name, number, action) {
      this.updates.push({ name, number, action });
      console.log(`Phone book update: ${name} ${action} (${number})`);
    }
  }
  
  class PhoneNumberObserver {
    Update(number) {
      console.log(`${number}`);
    }
  }
  
  class DialingObserver {
    Update(number) {
      console.log(`Now Dialing: ${number}`);
    }
  }
  
  // Telephone class with observer pattern
  class Telephone {
    constructor() {
      this.phoneBook = new Map();
      this.observers = [];
    }
  
    // Method to add a phone number to the phone book
    AddPhoneNumber(name, number) {
      if (this.phoneBook.has(name)) {
        console.log(`${name} is already in the phone book.`);
      } else {
        this.phoneBook.set(name, number);
        console.log(`${name} added to the phone book.`);
        this.NotifyObservers(name, number, 'added');
      }
    }
  
    // Method to remove a phone number from the phone book
    RemovePhoneNumber(name) {
      if (this.phoneBook.has(name)) {
        const number = this.phoneBook.get(name);
        this.phoneBook.delete(name);
        console.log(`${name}'s phone number removed from the phone book.`);
        this.NotifyObservers(name, number, 'removed');
      } else {
        console.log(`${name} is not in the phone book.`);
      }
    }
  
    // Method to dial a phone number
    DialPhoneNumber(name) {
      if (this.phoneBook.has(name)) {
        const number = this.phoneBook.get(name);
        this.NotifyObservers(number);
        console.log(`Dialing ${number} for ${name}.`);
      } else {
        console.log(`${name} is not in the phone book.`);
      }
    }
  
    // Method to add an observer
    AddObserver(observer) {
      this.observers.push(observer);
    }
  
    // Method to remove an observer
    RemoveObserver(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    // Method to notify observers
    NotifyObservers(...args) {
      this.observers.forEach(observer => observer.Update(...args));
    }
  }
  
  // Example usage:
  const phone = new Telephone();
  const observer1 = new PhoneNumberObserver();
  const observer2 = new DialingObserver();
  
  phone.AddObserver(observer1);
  phone.AddObserver(observer2);
  
  phone.AddPhoneNumber("John", "123-456-7890");
  phone.DialPhoneNumber("John");
  phone.RemoveObserver(observer1);
  phone.RemoveObserver(observer2);
  
  phone.AddPhoneNumber("Alice", "987-654-3210");
  phone.DialPhoneNumber("Alice");
  