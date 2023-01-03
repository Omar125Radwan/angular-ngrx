export class User {
  constructor(
    private email: string, private token: string,
    private localId: string, expirationdate: Date,
    ){}
}
