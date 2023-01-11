export class User {
  constructor(
    private email: string,
    private token: string,
    private localId: string,
    private expirationdate: Date = new Date("2023-03-25"),
    ){}

    get expireDate() {
      // return this.expirationdate;
      return this.expirationdate;
    }
    get userToken() {
      return this.token;
    }
}
