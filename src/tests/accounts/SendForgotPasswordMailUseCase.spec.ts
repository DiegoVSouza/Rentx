import { UsersRepositoryInMemory } from "../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../../modules/accounts/useCases/createUser/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "../../modules/accounts/useCases/sendFogotPasswordMail/SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let dateProvider: DayjsDateProvider;
describe("Send fogot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory,usersTokensRepositoryInMemory,dateProvider,mailProviderInMemory);
  });
  it("should be able to send a forgot password mail to user", () => {

  });
});
