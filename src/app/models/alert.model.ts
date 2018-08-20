import uuidv4 from 'uuid/v4';

export class AlertModel {
  id: string;

  constructor(
    public text: string,
    public type: string
  ) {
    this.id = uuidv4();
  }

  getId() {
    return this.id;
  }
}