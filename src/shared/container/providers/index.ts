import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/interfaces/IDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/interfaces/IMailProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
)