// Export all entities
export { User } from './User.js';

// Mock entities to make the app work
export class SOSEvent {
  static async list(sort, limit) {
    return [];
  }
}

export class CheckIn {
  static async filter(params) {
    return [];
  }
  
  static async create(data) {
    return { id: Date.now(), ...data };
  }
  
  static async update(id, data) {
    return { id, ...data };
  }
}

export class SafeWalk {
  static async filter(params) {
    return [];
  }
  
  static async create(data) {
    return { id: Date.now(), ...data };
  }
  
  static async update(id, data) {
    return { id, ...data };
  }
}

export class EmergencyContact {
  static async list(sort) {
    return [];
  }
  
  static async create(data) {
    return { id: Date.now(), ...data };
  }
  
  static async update(id, data) {
    return { id, ...data };
  }
  
  static async delete(id) {
    return true;
  }
}

export class SafetyZone {
  static async list() {
    return [];
  }
  
  static async create(data) {
    return { id: Date.now(), ...data };
  }
}