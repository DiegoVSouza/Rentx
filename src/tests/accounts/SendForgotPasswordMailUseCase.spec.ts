import { UsersRepositoryInMemory } from "../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../../modules/accounts/useCases/createUser/CreateUserUseCase";
import { SendForgotPasswordMailUseCase } from "../../modules/accounts/useCases/sendFogotPasswordMail/SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../shared/errors/AppError";

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
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail")
    await usersRepositoryInMemory.create({
      driver_license: "070673",
      email: "job@ok.bf",
      name: "Noah Hall",
      password: "123"
    })
    await sendForgotPasswordMailUseCase.execute("job@ok.bf")

    expect(sendMail).toHaveBeenCalled();

  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("email@teste.com")
    ).rejects.toEqual(new AppError("User does not exist"))
  })

  it("should be able to creat an users token", async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create")
    await usersRepositoryInMemory.create({
      driver_license: "070673",
      email: "email@teste.com",
      name: "Noah Hall",
      password: "123"
    })
    await sendForgotPasswordMailUseCase.execute('email@teste.com')
    expect(generateTokenEmail).toBeCalled()
  })
});
