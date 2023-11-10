export default interface ICustomer {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  persinalCode?: number;
  userType?: string;
  birthDate?: Date;
  allergies?: string[];
  annoyances?: string;
  note?: string;
}
